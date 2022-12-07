import { Scene,Engine,Vector3,FreeCamera, HemisphericLight, MeshBuilder, SceneLoader, ArcRotateCamera, Color3, DirectionalLight, StandardMaterial, CubeTexture, Texture } from "@babylonjs/core";
import "@babylonjs/loaders"
export class BasicScene{
    scene:Scene;
    engine:Engine;
    constructor(private canvas:HTMLCanvasElement){
       this.engine=new Engine(this.canvas,true);
       this.engine.enableOfflineSupport = false;
       this.scene=this.CreateScene();
       //this.CreateEnvironment();
       this.engine.runRenderLoop(()=>{
        this.scene.render();
       })
    }

    CreateScene():Scene{
        // const scene=new Scene(this.engine)
        //  const camera=new FreeCamera("camera",new Vector3(0, 10, -50),this.scene);
        //   camera.attachControl();
        //   camera.speed=0.1;
        //   camera.minZ=0.01;
          

        //   const hemiLight=new HemisphericLight("hemilight",new Vector3(0,1,0),this.scene);

        //   hemiLight.intensity=0.5;
        //  const ground =MeshBuilder.CreateGround("ground",{width:10,height:10},this.scene)
        //   const ball=MeshBuilder.CreateSphere("ball",{diameter:1},this.scene);
        //   ball.position= new Vector3(0,1,0);
        //   ball.position.x=1;

        // return scene;


        
    // Low Poly Character with Blender Tutorial of Grant Abbitt: https://www.youtube.com/user/mediagabbitt
    // Character animations by Mixamo: https://www.mixamo.com/

  

    // Scene and Camera
    const scene = new Scene(this.engine);
    const  camera1 = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new Vector3(0, -3, -4), this.scene);
    scene.activeCamera = camera1;
    scene.activeCamera.attachControl(this.canvas, true);
    camera1.lowerRadiusLimit = 2;
    camera1.upperRadiusLimit = 10;
    camera1.wheelDeltaPercentage = 0.01;

    // Lights
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.6;
    light.specular = Color3.Black();

    const light2 = new DirectionalLight("dir01", new Vector3(0, -0.5, -1.0), scene);
    light2.position = new Vector3(0, 5, 5);

    // Skybox
    const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    const skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("textures/skybox2", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // Ground
    const ground = MeshBuilder.CreateGround("ground", { height: 50, width: 50, subdivisions: 4 }, scene);
    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new Texture("textures/wood.jpg", scene);
   // groundMaterial.diffuseTexture.uScale = 30;
   // groundMaterial.diffuseTexture.vScale = 30;
    groundMaterial.specularColor = new Color3(.1, .1, .1);
    ground.material = groundMaterial;


    // Load hero character and play animation
    SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        const hero = newMeshes[0];

        //Scale the model down        
        hero.scaling.scaleInPlace(0.1);

        //Lock camera on the character 
       // camera1.target = hero;

        //Get the Samba animation Group
        const sambaAnim = scene.getAnimationGroupByName("Samba");

        //Play the Samba animation  
        //sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);

    });
    
 return scene;
    }

   /* async CreateEnvironment():Promise<void>{
        const{meshes}=await SceneLoader.ImportMeshAsync(
            "",".models/",
            "monkey.glb");
    }*/

    // async CreateEnvironment():Promise<void>{
    //     const{meshes}=await SceneLoader.ImportMeshAsync(
    //         "","https://assets.babylonjs.com/meshes/",
    //         "HVGirl.glb");
    // }

   
}