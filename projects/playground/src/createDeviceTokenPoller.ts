import type { OAuthDeviceTokenResponse, TraktApi } from '@trakt/api';

export function createDeviceTokenPoller(api: TraktApi) {
    return async function ({
        client_id,
        client_secret,
    }: {
        client_id: string;
        client_secret: string;
    }): Promise<OAuthDeviceTokenResponse> {
        const codeResponse = await api.oauth.device.code({
            body: {
                client_id,
            },
        });

        if (codeResponse.status !== 200) {
            return Promise.reject(codeResponse.body);
        }

        console.log(
            `Go to: ${codeResponse.body.verification_url}/${codeResponse.body.user_code}`,
        );

        return new Promise(
            (resolve, reject) => {
                const codeExpiresAt = Date.now() +
                    codeResponse.body.expires_in * 1000;

                const tokenInterval = setInterval(async () => {
                    if (Date.now() > codeExpiresAt) {
                        clearInterval(tokenInterval);
                        reject('Code has expired');
                    }

                    const tokenResponse = await api.oauth.device
                        .token({
                            body: {
                                code: codeResponse.body.device_code,
                                client_id,
                                client_secret,
                            },
                        })
                        .catch(() => {
                            // Trakt API does not return a correct body for 400 responses
                            // throws error when trying to parse JSON
                            return Promise.resolve(
                                { status: 400, body: undefined } as {
                                    status: 400;
                                    body: undefined;
                                },
                            );
                        });

                    if (tokenResponse.status === 200) {
                        resolve(tokenResponse.body);
                        clearInterval(tokenInterval);
                    }
                }, codeResponse.body.interval * 1000);
            },
        );
    };
}
