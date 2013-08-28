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

var TimelineCallbackTestLayer = cc.Layer.extend({
    _helloLabel :null,

    onResolveCCBCCMenuItemSelector:function(target, selectorName){
        return null;
    },

    onResolveCCBCCControlSelector:function(target, selectorName){
        return null;
    },

    onResolveCCBCCCallFuncSelector:function(target,selectorName){
        if(this == target && "onCallback1" == selectorName){
            return this.onCallback1;
        }

        if(this == target && "onCallback2" == selectorName){
            return this.onCallback2;
        }
    },

    onAssignCCBMemberVariable:function(target, memberVariableName,node){
        if(target == this && memberVariableName == "helloLabel"){
            if(node instanceof  cc.LabelTTF){
                this._helloLabel = node;
            }
            return true;
        }

        return false;
    },

    onCallback1:function(sender){
        // Rotate the label when the button is pressed
        this._helloLabel.runAction(cc.RotateBy.create(1,360));
        this._helloLabel.setString("Callback 1");
    },

    onCallback2:function(sender){
        // Rotate the label when the button is pressed
        this._helloLabel.runAction(cc.RotateBy.create(1,-360));
        this._helloLabel.setString("Callback 2");
    }
});

TimelineCallbackTestLayer.create = function(){
    var retLayer = new TimelineCallbackTestLayer();
    if(retLayer && retLayer.init()){
        return retLayer;
    }
    return null;
};

var TimelineCallbackTestLayerLoader = cc.LayerLoader.extend({
    _createCCNode:function(parent,ccbReader){
        return TimelineCallbackTestLayer.create();
    }
});