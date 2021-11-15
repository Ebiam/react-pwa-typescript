const config = {
    "api_url": process.env.NODE_ENV !== 'production' ?
        "https://node-backend-pwa.herokuapp.com" : " http://localhost:4000",
    "vapidPublicKey": "BM0AYWnrNIo1NGaYDYgok4I-xtyB1NZidBV0MtUKEdx8jKIDaO7g8b9eOjNAOgFuf80mSyyGGoFUf3UNOBK_lqQ"

};

export default config;
