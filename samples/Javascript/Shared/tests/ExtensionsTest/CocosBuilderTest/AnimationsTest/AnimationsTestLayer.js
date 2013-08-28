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

var AnimationsTestLayer = cc.Layer.extend({
     _animationManager:null,

    onResolveCCBCCMenuItemSelector:function(target,selectorName){
        return null;
    },

    onResolveCCBCCControlSelector:function(target, selectorName){
        if(this == target && "onCCControlButtonIdleClicked" == selectorName)
            return this.onCCControlButtonIdleClicked;

        if(this == target && "onCCControlButtonWaveClicked" == selectorName)
            return this.onCCControlButtonWaveClicked;

        if(this == target && "onCCControlButtonJumpClicked" == selectorName)
            return this.onCCControlButtonJumpClicked;

        if(this == target && "onCCControlButtonFunkyClicked" == selectorName)
            return this.onCCControlButtonFunkyClicked;

        return null;
    },

    onAssignCCBMemberVariable:function(target, memberVariableName, node){
        if (this._target == this && memberVariableName == "mAnimationManager") {
            if(node instanceof  cc.BuilderAnimationManager){
                this._animationManager = node;
            }
            return true;
        }
        return false;
    },

    onCCControlButtonIdleClicked:function(sender, controlEvent){
        this._animationManager.runAnimations("Idle", 0.3);
    },

    onCCControlButtonWaveClicked:function(sender, controlEvent){
        this._animationManager.runAnimations("Wave", 0.3);
    },

    onCCControlButtonJumpClicked:function(sender, controlEvent){
        this._animationManager.runAnimations("Jump", 0.3);
    },

    onCCControlButtonFunkyClicked:function(sender, controlEvent){
        this._animationManager.runAnimations("Funky", 0.3);
    },

    setAnimationManager:function(animationManager){
        this._animationManager = animationManager;
    }
});

AnimationsTestLayer.create = function(){
    var retLayer = new AnimationsTestLayer();
    if(retLayer && retLayer.init()){
        return retLayer;
    }
    return null;
};

var AnimationsTestLayerLoader = cc.LayerLoader.extend({
    _createCCNode:function(parent,ccbReader){
        return AnimationsTestLayer.create();
    }
});