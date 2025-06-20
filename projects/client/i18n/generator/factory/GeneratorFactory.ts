/**
 * Factory for creating platform-specific generators
 */

import type { MetaMessages } from '../model/MetaMessages.ts';
import { Platform } from '../model/Platform.ts';
import type { PlatformGenerator } from '../model/PlatformGenerator.ts';
import { AndroidGenerator } from '../platform/AndroidGenerator.ts';
import { IOSGenerator } from '../platform/IOSGenerator.ts';
import { WebGenerator } from '../platform/WebGenerator.ts';

export class GeneratorFactory {
  static create(platform: Platform): PlatformGenerator {
    switch (platform) {
      case 'web':
        return new WebGenerator();
      case 'android':
        return new AndroidGenerator();
      case 'ios':
        return new IOSGenerator();
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  static getEnabledPlatforms(metaMessages: MetaMessages): Platform[] {
    const platforms: Platform[] = [];
    const { generator } = metaMessages.meta;

    if (generator?.inlang?.enabled) {
      platforms.push(Platform.WEB);
    }
    if (generator?.android?.enabled) {
      platforms.push(Platform.ANDROID);
    }
    if (generator?.ios?.enabled) {
      platforms.push(Platform.IOS);
    }

    return platforms;
  }
}
