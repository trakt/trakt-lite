package com.example.traktlite

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity

class MainActivity : ComponentActivity() {

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val webView = WebView(this)
        webView.settings.apply {
            javaScriptEnabled = true  // Enable JavaScript
            domStorageEnabled = true  // Enable local storage
            // cacheMode = WebSettings.LOAD_NO_CACHE // TODO decide cache mode
            useWideViewPort = true //enable support for viewport meta tags
            loadWithOverviewMode = true // load webpage scaled to fit the webview
        }

        //https://developer.android.com/develop/ui/views/layout/webapps/webview
        //TODO add javascript interfaces?
        webView.setInitialScale(0)

        webView.webViewClient = WebViewClient()

        // TODO: change url based on env (dev, preview, prod
        // 10.0.2.2 is the alias to host machine's loopback interface
        webView.loadUrl("http://10.0.2.2:5173/")  // Replace with your actual URL

        setContentView(webView)
    }
}
