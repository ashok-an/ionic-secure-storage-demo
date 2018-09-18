# ionic-secure-storage-demo
A sample CRUD app to demo the working of secure-storage cordova plugin

**Objective**: To demonstrate the working of cordova-secure-storage plugin

**Notes**: 
1. Need to run `npm install --save @ionic-native/secure-storage` explicitly
2. Not sure if it works on ionic v4 (I have tested against ionic v3)
3. In IOS if data is not shown try this:
```
cordova plugin add cordova-plugin-secure-storage

https://evgenii.com/blog/sharing-keychain-in-ios/

Add below line in config.xml
<preference name="KeychainAccessibility" value="WhenUnlocked" />
```

TODO:
==
1. Better implementation of *get_data()* via promises/async-await
2. Link to output of analysis done with https://github.com/MobSF/Mobile-Security-Framework-MobSF

