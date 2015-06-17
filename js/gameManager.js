function startGame () {
	scene.add(generateHexGrid(10, 10));
}

function generateHexGrid (width, height) {
	var hexRadius = 10, hexHeight = 2, diameter = hexRadius * 2;
	var gridHolder = new THREE.Object3D();
	var hexGeometry = new THREE.CylinderGeometry( hexRadius, hexRadius, hexHeight, 6 );

	for ( var w = 1; w <= width; w++ ) {
		for ( var h = 1; h <= height; h++ ) {
			var zOffset = 0;
			if( h % 2 == 0 ) zOffset = hexRadius;
			hexMaterial = new THREE.MeshBasicMaterial( { wireframe: false } );
			hexMesh = new THREE.Mesh(hexGeometry, hexMaterial);
			hexMesh.position.setX( -( ( width / 2 ) * diameter ) + ( w * diameter ) + zOffset );		
			hexMesh.position.setY( -hexHeight / 2 );
			hexMesh.position.setZ( -( ( height / 2 ) * diameter ) + ( h * ( diameter ) ) );	
			//hexMesh.material.color = new THREE.Color( Math.random(), Math.random(), Math.random() );
			gridHolder.add(hexMesh);
		};
	};

	return gridHolder;
}