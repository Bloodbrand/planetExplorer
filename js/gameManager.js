var rows = [];
var gridHolder = new THREE.Object3D();

function startGame () {
	scene.add(generateSquareGrid(15, 15));
}

function generateHexGrid (width, height) {
	var hexRadius = 10, hexHeight = 2, diameter = hexRadius * 2;
	var hexGeometry = new THREE.CylinderGeometry( hexRadius, hexRadius, hexHeight, 6 );

	for ( var w = 0; w < width; w++ ) {
		var currentRow = [];
		for ( var h = 0; h < height; h++ ) {
			var xOffset = 0;
			if( h % 2 == 0 ) xOffset = hexRadius;
			hexMaterial = new THREE.MeshBasicMaterial( { wireframe: false } );
			hexMesh = new THREE.Mesh(hexGeometry, hexMaterial);
			hexMesh.position.setX( -( ( width / 2 ) * diameter ) + ( w * diameter ) + xOffset );		
			hexMesh.position.setY( -hexHeight / 2 );
			hexMesh.position.setZ( -( ( height / 2 ) * diameter ) + ( h * ( diameter ) ) );	
			//hexMesh.material.color = new THREE.Color( 0, Math.random(), 0 );
			hexMesh.rowNumber = h;
			hexMesh.columnNumber = w;
			//if(Math.random() > 0.9) hexMesh.visible = false;
			currentRow.push(hexMesh);
			gridHolder.add(hexMesh);
		};
		rows.push(currentRow);
	};

	return gridHolder;
}

function generateSquareGrid (width, height) {
	var boxSide = 10, boxHeight = 2, diameter = boxSide * 2;
	var spaceBetween = 1;
	//var hexGeometry = new THREE.CylinderGeometry( hexRadius, hexRadius, hexHeight, 4 );
	var cubeGeometry = new THREE.BoxGeometry( boxSide, boxHeight, boxSide);

	for ( var w = 0; w < width; w++ ) {
		var currentRow = [];
		for ( var h = 0; h < height; h++ ) {
			var xOffset = 0;
			//if( h % 2 == 0 ) xOffset = boxSide;
			hexMaterial = new THREE.MeshBasicMaterial( { wireframe: false } );
			hexMesh = new THREE.Mesh(cubeGeometry, hexMaterial);
			hexMesh.position.setX( -( ( ( width / 2 ) * (boxSide + spaceBetween ) ) )  + 
									( w * ( boxSide + spaceBetween ) ) );		
			hexMesh.position.setY( -boxHeight / 2 );
			hexMesh.position.setZ( -( ( height / 2 ) * ( boxSide + spaceBetween ) ) + 
									( h * (boxSide + spaceBetween) ) );
			hexMesh.rowNumber = h;
			hexMesh.columnNumber = w;
			currentRow.push(hexMesh);
			gridHolder.add(hexMesh);
		};
		rows.push(currentRow);
	};

	return gridHolder;
}

function findAdjacentHexes (hex ,range) {
	var offset = 1;
	var trueColor = new THREE.Color( 0x00ff00 );
	var falseColor = new THREE.Color( 0xff0000 );
	hex.material.color.set( trueColor ); 
	if(hex.rowNumber % 2 == 0) offset = 0;
	for (var i = 1; i <= range; i++) {		
		rows[hex.columnNumber - i + (1 - offset)][hex.rowNumber - 1].material.color.set( trueColor ); 
		rows[hex.columnNumber + i - offset][hex.rowNumber - 1].material.color.set( trueColor );
		rows[hex.columnNumber - i][hex.rowNumber].material.color.set( trueColor );
		rows[hex.columnNumber + i][hex.rowNumber].material.color.set( trueColor );
		rows[hex.columnNumber - i + (1 - offset)][hex.rowNumber + 1].material.color.set( trueColor );
		rows[hex.columnNumber + i - offset][hex.rowNumber + 1].material.color.set( trueColor );
	};
}