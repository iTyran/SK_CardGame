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

var ButtonTestLayer = cc.Layer.extend({
     _controlEventLabel:null,

    onResolveCCBCCMenuItemSelector:function(target,selectorName){
        return null;
    } ,

    onResolveCCBCCControlSelector:function(target, selectorName){
        if(target == this && selectorName == "onCCControlButtonClicked"){
            return this.onCCControlButtonClicked;
        }
        return null;
    } ,

    onAssignCCBMemberVariable:function(target, memberVariableName,node){
        if(this == target && memberVariableName == "mCCControlEventLabel"){
            if(node instanceof  cc.LabelBMFont)
               this._controlEventLabel = node;
            return true;
        }
        return false;
    },

    onCCControlButtonClicked:function(sender,controlEvent){
         switch(controlEvent){
             case cc.CONTROL_EVENT_TOUCH_DOWN:
                 this._controlEventLabel.setString("Touch Down.");
                 break;
             case cc.CONTROL_EVENT_TOUCH_DRAG_INSIDE:
                 this._controlEventLabel.setString("Touch Drag Inside.");
                 break;
             case cc.CONTROL_EVENT_TOUCH_DRAG_OUTSIDE:
                 this._controlEventLabel.setString("Touch Drag Outside.");
                 break;
             case cc.CONTROL_EVENT_TOUCH_DRAG_ENTER:
                 this._controlEventLabel.setString("Touch Drag Enter.");
                 break;
             case cc.CONTROL_EVENT_TOUCH_DRAG_EXIT:
                 this._controlEventLabel.setString("Touch Drag Exit.");
                 break;
             case cc.CONTROL_EVENT_TOUCH_UP_INSIDE:
                 this._controlEventLabel.setString("Touch Up Inside.");
                 break;
             case cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE:
                 this._controlEventLabel.setString("Touch Up Outside.");
                 break;
             case cc.CONTROL_EVENT_TOUCH_CANCEL:
                 this._controlEventLabel.setString("Touch Cancel.");
                 break;
             case cc.CONTROL_EVENT_VALUECHANGED:
                 this._controlEventLabel.setString("Value Changed.");
                 break;
             default:
                 cc.assert(false);
                 break;
         }
    }
});

ButtonTestLayer.create = function(){
    var retLayer = new ButtonTestLayer();
    if(retLayer && retLayer.init()){
        return retLayer;
    }
    return null;
};

var ButtonTestLayerLoader = cc.LayerLoader.extend({
    _createCCNode:function(parent,ccbReader){
        return ButtonTestLayer.create();
    }
});
