<script>
  import { onMount } from 'svelte'
  import { getRamdomUser, getAppData } from './helpers/helpers.js'
  const { Xfo, Vec3, CuttingPlane, Color } = window.zeaEngine
  const { MeasurementTool, CreateFreehandLineTool, LinearMovementHandle } = window.zeaUx
  import loadAsset from './loadAsset'
  
  const { Session, SessionSync } = window.zeaCollab
  const {
    GLRenderer,
    Scene,
    TreeItem,
    PassType,
    GeomItem,
    Color,
    Vec2,
    Vec3,
    Mat3,
    Mat4,
    Box3,
    Group,
    Material,
    Xfo,
    Points,
    Lines,
    Ray,
    Sphere,
    Plane,
    Cone,
    Cuboid,
    Cylinder,
    Torus,
    Label,
    BillboardItem
  } = window.zeaEngine


  
  let canvas
  let cuttingPlane
  let scene
  let renderer
  let userChip
  let userChipSet
  let measurementTool
  let freeHandLineTool
  let cameraManipulator
  let asset
  
  
  
  const useCameraManipulator = () => {
    renderer.getViewport().setManipulator(cameraManipulator)

    freeHandLineTool.deactivateTool()
    canvas.style.cursor = 'auto'
  }
  
  onMount(async () => {
    const appData = getAppData(canvas)
    scene = appData.scene
    renderer = appData.renderer

    const userData = await getRamdomUser()

    const socketUrl = 'https://websocket-staging.zea.live'
    const session = new Session(userData, socketUrl)
    session.joinRoom('zea-template-svelte')

    const sessionSync = new SessionSync(session, appData, userData, {})
    userChipSet.session = session
    userChip.userData = userData

    asset = loadAsset()
    scene.getRoot().addChild(asset)

    // Initializing the treeview
    const sceneTreeView = document.getElementById('zea-tree-view')
    sceneTreeView.appData = appData
    sceneTreeView.rootItem = asset

    measurementTool = new MeasurementTool({ scene })
    measurementTool.activateTool()

    freeHandLineTool = new CreateFreehandLineTool(appData)

    cameraManipulator = renderer.getViewport().getManipulator()

    renderer.getViewport().getCamera().setPositionAndTarget(new Vec3(2.5, 0, 0), new Vec3(0, 0, 0))
    
    const toolbar = document.createElement('zea-toolbar')
    toolbar.tools = {
      cameraManipulator: {
        tag: 'zea-toolbar-tool',
        data: {
          iconName: 'camera-outline',
          toolName: 'Camera Manipulator',
          callback:  () => useCameraManipulator(),
        },
      }
      
      
      
      
  
</script>

<zea-layout orientation="vertical" cell-a-size="50" resize-cell-a="false" cell-b-size="100%" cell-c-size="0" resize-cell-c="false">
  <!-- Header Start -->
  <div slot="a" class="App-header">
    <img alt="ZEA logo" class="App-logo" src="https://cdn.glitch.com/856ac347-50fb-49cd-9955-8103e75576c2%2Flogo-zea.svg?v=1604353117346" />
    <div class="MenuHolder">
      <zea-menu type="dropdown" show-anchor="true">
        <zea-menu-item>
          Tools
          <zea-menu-subitems>
            <zea-menu-item class="MenuItem" hotkey="c" id="camera-manipulator" callback={useCameraManipulator}>Camera Manipulator</zea-menu-item>
            <zea-menu-item class="MenuItem" hotkey="m" id="measurement-tool" callback={useMeasurementTool}>Measurement Tool</zea-menu-item>
          </zea-menu-subitems>
        </zea-menu-item>
      </zea-menu>
    </div>
    <div class="UserChipSetHolder">
      <zea-user-chip-set bind:this={userChipSet} id="zea-user-chip-set" />
    </div>

    <zea-user-chip bind:this={userChip} id="zea-user-chip" />
  </div>
  <!-- Header End -->

  <zea-layout slot="b" cell-a-size="200" cell-b-size="100%" cell-c-size="0" resize-cell-c="false">
    <!-- Sidebar Start -->
    <zea-scroll-pane slot="a">
      <zea-tree-view id="zea-tree-view"></zea-tree-view>
    </zea-scroll-pane>
    <!-- Sidebar Start -->

    <!-- Viewport Start -->
    <div slot="b" id="scene-host">
      <canvas bind:this={canvas} id="renderer" />
    </div>
    <!-- Viewport Start -->
  </zea-layout>
</zea-layout>
  