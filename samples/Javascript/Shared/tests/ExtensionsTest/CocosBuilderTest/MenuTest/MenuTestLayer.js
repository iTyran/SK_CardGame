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

var MenuTestLayer = cc.Layer.extend({
    _menuItemStatusLabelBMFont:null,

    onResolveCCBCCMenuItemSelector:function(target, selectorName){
        if(target == this && selectorName == "onMenuItemAClicked"){
            return this.onMenuItemAClicked;
        }

        if(target == this && selectorName == "onMenuItemBClicked"){
            return this.onMenuItemBClicked;
        }

        if(target == this && selectorName == "onMenuItemCClicked"){
            return this.onMenuItemCClicked;
        }
        return null;
    },

    onResolveCCBCCControlSelector:function(target, selectorName){
        return null;
    },

    onAssignCCBMemberVariable:function(target, memberVariableName, node){
        if(this == target && memberVariableName == "mMenuItemStatusLabelBMFont"){
            if(node instanceof  cc.LabelBMFont)
                this._menuItemStatusLabelBMFont = node;
            return true;
        }
        return false;
    },

    onMenuItemAClicked:function(sender){
        this._menuItemStatusLabelBMFont.setString("Menu Item A clicked.");
    },

    onMenuItemBClicked:function(sender){
        this._menuItemStatusLabelBMFont.setString("Menu Item B clicked.");
    },

    onMenuItemCClicked:function(sender){
        this._menuItemStatusLabelBMFont.setString("Menu Item C clicked.");
    }
});

MenuTestLayer.create = function(){
    var retLayer = new MenuTestLayer();
    if(retLayer && retLayer.init()){
        return retLayer;
    }
    return null;
};

var MenuTestLayerLoader = cc.LayerLoader.extend({
    _createCCNode:function(parent,ccbReader){
        return MenuTestLayer.create();
    }
});
