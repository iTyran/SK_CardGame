/****************************************************************************

 http://www.cocos2d-html5.org
 http://www.cocos2d-iphone.org
 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var fileUtilsTestSceneIdx = -1;

//------------------------------------------------------------------
//
// FileUtilsBase
//
//------------------------------------------------------------------
var FileUtilsBase = BaseTestLayer.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        this._super(cc.c4b(0,0,0,255), cc.c4b(98,99,117,255));
    },

    onRestartCallback:function (sender) {
        var s = new FileUtilsTestScene();
        s.addChild(restartFileUtilsTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new FileUtilsTestScene();
        s.addChild(nextFileUtilsTest());
        director.replaceScene(s);
    },
    onBackCallback:function (sender) {
        var s = new FileUtilsTestScene();
        s.addChild(previousFileUtilsTest());
        director.replaceScene(s);
    },

    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfFileUtilsTest.length-1) - fileUtilsTestSceneIdx );
    },
    getTestNumber:function() {
        return fileUtilsTestSceneIdx;
    }
});

//------------------------------------------------------------------
//
// FilenameLookupTest
//
//------------------------------------------------------------------
var FilenameLookupTest = FileUtilsBase.extend({
    _title:"Testing FilenameLookup ",
    _subtitle:"You should see a grossini on the screen",

    ctor:function () {
        this._super();

        var t = sys.platform;
        if( t == 'mobile')  {
            cc.FileUtils.getInstance().loadFilenameLookup('FileUtils/lookup-mobile.plist');
        } else if( t == 'desktop' ) {
            cc.FileUtils.getInstance().loadFilenameLookup('FileUtils/lookup-desktop.plist');
        } else {
            cc.FileUtils.getInstance().loadFilenameLookup('FileUtils/lookup-html5.plist');
        }

        var sprite = cc.Sprite.create("grossini.bmp");
        this.addChild( sprite );
        sprite.setPosition( winSize.width/2, winSize.height/2);


        //
        // only for automation
        //
        if ( autoTestEnabled ) {
            if ( t == 'mobile' )  {
                this.expectedFilename = "grossini_pvr_rgba4444.pvr";
            } else if( t == 'desktop' ) {
                this.expectedFilename = "grossini_pvr_rgba8888.pvr";
            } else {
                this.expectedFilename = "grossini.png";
            }
        }
    },

    //
    // only for automation
    //
    getExpectedResult:function() {
        return this.expectedFilename;
    },
    getCurrentResult:function() {
        var filenamePlusPath    = cc.FileUtils.getInstance().fullPathForFilename("grossini.bmp");
        var filename            = filenamePlusPath.replace(/^.*(\\|\/|\:)/, '');
        return filename;
    }
});

var FileUtilsTestScene = TestScene.extend({
    runThisTest:function () {
        fileUtilsTestSceneIdx = -1;
        var layer = nextFileUtilsTest();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

//
// Flow control
//

var arrayOfFileUtilsTest = [

    FilenameLookupTest
];

var nextFileUtilsTest = function () {
    fileUtilsTestSceneIdx++;
    fileUtilsTestSceneIdx = fileUtilsTestSceneIdx % arrayOfFileUtilsTest.length;

    return new arrayOfFileUtilsTest[fileUtilsTestSceneIdx]();
};
var previousFileUtilsTest = function () {
    fileUtilsTestSceneIdx--;
    if (fileUtilsTestSceneIdx < 0)
        fileUtilsTestSceneIdx += arrayOfFileUtilsTest.length;

    return new arrayOfFileUtilsTest[fileUtilsTestSceneIdx]();
};
var restartFileUtilsTest = function () {
    return new arrayOfFileUtilsTest[fileUtilsTestSceneIdx]();
};

