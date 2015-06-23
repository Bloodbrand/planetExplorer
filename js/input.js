var mouseRaycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var hoverHex;
var hoverHex_UUID = 0;

function onMouseMove( event ) {
   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;  
}

function manageMouseInput () {   
   mouseRaycaster.setFromCamera( mouse, camera ); 

   var intersects = mouseRaycaster.intersectObjects( gridHolder.children );

   //hovering over nothing valid
   if(!intersects[0])
   {
      if(hoverHex) hoverHex.material.color.set( 0xffffff );
      hoverHex_UUID = undefined;
      allHexesWhite(); 
      return; 
   } 

   //hovering over new hex
   if(intersects[0].object.uuid != hoverHex_UUID)
   {
      if(hoverHex) hoverHex.material.color.set( 0xffffff ); 
      //allHexesWhite();
      hoverHex = intersects[0].object;
      //findAdjacentHexes(hoverHex, 2)
      hoverHex.material.color.set( 0xff0000 ); 
      hoverHex_UUID = intersects[0].object.uuid;
   }
 } 

 function allHexesWhite () {
    for (var i = 0; i < gridHolder.children.length; i++) {
         gridHolder.children[i].material.color.set( 0xffffff ); 
    };
 }


