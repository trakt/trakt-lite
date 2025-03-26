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
            cacheMode = WebSettings.LOAD_NO_CACHE
            useWideViewPort = true
            loadWithOverviewMode = true
        }

        webView.webViewClient = WebViewClient()
        // TODO: change url based on env (dev, preview, prod)
        webView.loadUrl("https://app.trakt.tv/")  // Replace with your actual URL

        setContentView(webView)
    }
}
