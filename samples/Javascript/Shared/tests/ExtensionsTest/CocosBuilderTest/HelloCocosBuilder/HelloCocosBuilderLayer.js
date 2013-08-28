/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

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

var HelloCocosBuilderLayer = cc.Layer.extend({
    _burstSprite:null,
    _testTitleLabelTTF:null,

    _customPropertyInt:0,
    _customPropertyFloat:0,
    _customPropertyBoolean:false,
    _customPropertyString:"",

    openTest:function(ccbFileName, nodeName,nodeLoader){
        /* Create an autorelease CCNodeLoaderLibrary. */
        var ccNodeLoaderLibrary = cc.NodeLoaderLibrary.newDefaultCCNodeLoaderLibrary();

        ccNodeLoaderLibrary.registerCCNodeLoader("TestHeaderLayer", new TestHeaderLayerLoader());
        if(nodeName != null && nodeLoader != null) {
            ccNodeLoaderLibrary.registerCCNodeLoader(nodeName, nodeLoader);
        }

        /* Create an autorelease CCBReader. */
        var ccbReader = new cc.BuilderReader(ccNodeLoaderLibrary);
        ccbReader.setCCBRootPath("res/");

        /* Read a ccbi file. */
        // Load the scene from the ccbi-file, setting this class as
        // the owner will cause lblTestTitle to be set by the CCBReader.
        // lblTestTitle is in the TestHeader.ccbi, which is referenced
        // from each of the test scenes.
        var node = ccbReader.readNodeGraphFromFile(ccbFileName, this);

        this._testTitleLabelTTF.setString(ccbFileName);
        var scene = cc.Scene.create();
        if(node != null)
            scene.addChild(node);

        /* Push the new scene with a fancy transition. */
        cc.Director.getInstance().pushScene(cc.TransitionFade.create(0.5, scene, cc.black()));
    },

    onResolveCCBCCMenuItemSelector:function(target,selectorName){
        return null;
    },
    onResolveCCBCCControlSelector:function(target,selectorName){
        if(this == target && "onMenuTestClicked" == selectorName){
            return this.onMenuTestClicked;
        }
        if(this == target && "onSpriteTestClicked" == selectorName){
            return this.onSpriteTestClicked;
        }
        if(this == target && "onButtonTestClicked" == selectorName){
            return this.onButtonTestClicked;
        }
        if(this == target && "onAnimationsTestClicked" == selectorName){
            return this.onAnimationsTestClicked;
        }
        if(this == target && "onParticleSystemTestClicked" == selectorName){
            return this.onParticleSystemTestClicked;
        }
        if(this == target && "onScrollViewTestClicked" == selectorName){
            return this.onScrollViewTestClicked;
        }
        if(this == target && "onTimelineCallbackSoundClicked" == selectorName){
            return this.onTimelineCallbackSoundClicked;
        }

        return null;
    },

    onAssignCCBMemberVariable:function(target,memberVariableName,node){
        if(target == this && memberVariableName == "mBurstSprite"){
            if(node instanceof  cc.Sprite){
                this._burstSprite = node;
            }
            return true;
        }

        if(target == this && memberVariableName == "mTestTitleLabelTTF"){
            if(node instanceof  cc.LabelTTF){
                this._testTitleLabelTTF = node;
            }
            return true;
        }

        return false;
    },

    onAssignCCBCustomProperty:function(target, memberVariableName,ccbValue){
        var bRet = false;
        if (target == this) {
            if (memberVariableName == "mCustomPropertyInt") {
                this._customPropertyInt = ccbValue;
                cc.log("CustomPropertyInt = " +this._customPropertyInt);
                bRet = true;
            } else if ( memberVariableName == "mCustomPropertyFloat") {
                this._customPropertyFloat = ccbValue;
                cc.log("CustomPropertyFloat = " + this._customPropertyFloat);
                bRet = true;
            } else if ( memberVariableName == "mCustomPropertyBoolean" ) {
                this._customPropertyBoolean = ccbValue;
                cc.log("CustomPropertyBoolean = " + this._customPropertyBoolean);
                bRet = true;
            } else if ( memberVariableName == "mCustomPropertyString" ) {
                this._customPropertyString = ccbValue;
                cc.log("CustomPropertyString = "  + this._customPropertyString);
                bRet = true;
            }
        }
        return bRet;
    },

    onNodeLoaded:function(node,nodeLoader){
        var ccRotateBy = cc.RotateBy.create(20.0, 360);
        var ccRepeatForever = cc.RepeatForever.create(ccRotateBy);
        this._burstSprite.runAction(ccRepeatForever);
    },

    onMenuTestClicked:function(sender,controlEvent){
        this.openTest("res/ccb/ccb/TestMenus.ccbi", "TestMenusLayer", new MenuTestLayerLoader());
    },
    onSpriteTestClicked:function(sender,controlEvent){
        this.openTest("res/ccb/ccb/TestSprites.ccbi", "TestSpritesLayer", new SpriteTestLayerLoader());
    },
    onButtonTestClicked:function(sender,controlEvent){
        this.openTest("res/ccb/ccb/TestButtons.ccbi", "TestButtonsLayer", new ButtonTestLayerLoader());
    },
    onAnimationsTestClicked:function(sender,controlEvent){
        //load node graph (testAnimations is a sub class of CCLayer) and retriveve the ccb action manager

        var actionManager;

        /* Create an autorelease CCNodeLoaderLibrary. */
        var ccNodeLoaderLibrary = cc.NodeLoaderLibrary.newDefaultCCNodeLoaderLibrary();

        ccNodeLoaderLibrary.registerCCNodeLoader("TestHeaderLayer", new TestHeaderLayerLoader());
        ccNodeLoaderLibrary.registerCCNodeLoader("TestAnimationsLayer", new AnimationsTestLayerLoader());

        /* Create an autorelease CCBReader. */
        var ccbReader = new cc.BuilderReader(ccNodeLoaderLibrary);
        ccbReader.setCCBRootPath("res/");

        /* Read a ccbi file. */
        // Load the scene from the ccbi-file, setting this class as
        // the owner will cause lblTestTitle to be set by the CCBReader.
        // lblTestTitle is in the TestHeader.ccbi, which is referenced
        // from each of the test scenes.
        var animationsTest = ccbReader.readNodeGraphFromFile("res/ccb/ccb/TestAnimations.ccbi", this, actionManager);
        actionManager = ccbReader.getAnimationManager();
        animationsTest.setAnimationManager(actionManager);

        this._testTitleLabelTTF.setString("TestAnimations.ccbi");

        var scene = cc.Scene.create();
        if(animationsTest != null) {
            scene.addChild(animationsTest);
        }

        /* Push the new scene with a fancy transition. */
        var transitionColor = cc.c3b(0,0,0);

        cc.Director.getInstance().pushScene(cc.TransitionFade.create(0.5, scene, transitionColor));

        //this.openTest("ccb/ccb/TestAnimations.ccbi", "TestAnimationsLayer", new AnimationsTestLayerLoader());
    },
    onParticleSystemTestClicked:function(sender,controlEvent){
        this.openTest("res/ccb/ccb/TestParticleSystems.ccbi", "TestParticleSystemsLayer", new ParticleSystemTestLayerLoader());
    },
    onScrollViewTestClicked:function(sender,controlEvent){
        this.openTest("res/ccb/ccb/TestScrollViews.ccbi", "TestScrollViewsLayer", new ScrollViewTestLayerLoader());
    },

    onTimelineCallbackSoundClicked:function(sender,controlEvent){
        this.openTest("res/ccb/ccb/TestTimelineCallback.ccbi", "TimelineCallbackTestLayer", new TimelineCallbackTestLayerLoader());
    }
});

HelloCocosBuilderLayer.create = function(){
    var retLayer = new HelloCocosBuilderLayer();
    if(retLayer && retLayer.init()){
        return retLayer;
    }
    return null;
};

var HelloCocosBuilderLayerLoader = cc.LayerLoader.extend({
    _createCCNode:function(parent,ccbReader){
        return HelloCocosBuilderLayer.create();
    }
});
