// JS Bindings constants
require("jsb.js");

// Load tests files
var tests_files = [
    // Resources definitions
    'tests_resources-jsb.js',

    // Load main file
    'tests-main.js',

    // base class
    'BaseTestLayer/BaseTestLayer.js',

    'ActionManagerTest/ActionManagerTest.js',
    'ActionsTest/ActionsTest.js',
    'ChipmunkTest/ChipmunkTest.js',
    'ClickAndMoveTest/ClickAndMoveTest.js',
    'ClippingNodeTest/ClippingNodeTest.js',
    'CocosDenshionTest/CocosDenshionTest.js',
    'CocosNodeTest/CocosNodeTest.js',
    'DrawPrimitivesTest/DrawPrimitivesTest.js',
    'EaseActionsTest/EaseActionsTest.js',
    'EffectsTest/EffectsTest.js',
    'EffectsAdvancedTest/EffectsAdvancedTest.js',
    'EventTest/EventTest.js',
    'FileUtils/FileUtilsTest.js',
    'FontTest/FontTest.js',
    'IntervalTest/IntervalTest.js',
    'LabelTest/LabelTest.js',
    'LayerTest/LayerTest.js',
    'MenuTest/MenuTest.js',
    'OpenGLTest/OpenGLTest.js',
    'ParallaxTest/ParallaxTest.js',
    'ParticleTest/ParticleTest.js',
    'PerformanceTest/PerformanceTest.js',
    'PerformanceTest/PerformanceNodeChildrenTest.js',
    'PerformanceTest/PerformanceParticleTest.js',
    'PerformanceTest/PerformanceSpriteTest.js',
    'PerformanceTest/PerformanceSpriteTest2.js',
    'PerformanceTest/PerformanceTextureTest.js',
    'PerformanceTest/PerformanceTouchesTest.js',
    'PerformanceTest/PerformanceAnimationTest.js',
    'PerformanceTest/seedrandom.js',
    'Presentation/Presentation.js',
    'ProgressActionsTest/ProgressActionsTest.js',
    'RenderTextureTest/RenderTextureTest.js',
    'RotateWorldTest/RotateWorldTest.js',
    'SceneTest/SceneTest.js',
    'SchedulerTest/SchedulerTest.js',
    'SpriteTest/SpriteTest.js',
    'ExtensionsTest/EditBoxTest/EditBoxTest.js',
    'ExtensionsTest/S9SpriteTest/S9SpriteTest.js',
    'ExtensionsTest/ExtensionsTest.js',
    'ExtensionsTest/TableViewTest/TableViewTestScene.js',
    'ExtensionsTest/NetworkTest/WebSocketTest.js',
    'XHRTest/XHRTest.js',
    'TileMapTest/TileMapTest.js',
    'TransitionsTest/TransitionsTest.js',
    'UnitTest/UnitTest.js',
    'SysTest/SysTest.js'
];

//whether to obfuscate the code
for (var i = 0; i < tests_files.length; i++) {
    var name = "" + tests_files[i];
    require(name);
}

var scene = cc.Scene.create();
var layer = new TestController();
scene.addChild(layer);
director.runWithScene(scene);
