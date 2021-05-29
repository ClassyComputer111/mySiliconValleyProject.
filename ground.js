class Ground
{
	constructor(x,y,width,height)
	{
	  var options={
		 isStatic:true,
		 visibality: true			
	    }

		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
	  // making a body as rectangle
		this.body=Bodies.rectangle(x, y, width, height, options);
 		World.add(world, this.body);

	}
	display()
	{	
		var groundPos=this.body.position;

		  push()
		  translate(groundPos.x, groundPos.y);
		  rectMode(CENTER);
		  fill("blue")
		  rect(0,0,this.width, this.height);
		  pop()
		  
			
	}

}