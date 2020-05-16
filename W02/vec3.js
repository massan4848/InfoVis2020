class Vec3 
{
	constructor(x,y,z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}


	// Add method
	add( v ){
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}
	substract( v ){
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}

	// Sum method
	sum(){
		return this.x + this.y + this.z;
	}
	max(){
		return Math.max(this.x,this.y,this.z);
	}
	min(){
		return Math.min(this.x,this.y,this.z);
	}
	mid(){
		var ary = new Array(this.x,this.y,this.z);
		var f =function(a,b){
			return a - b;
		}
		ary.sort(f);
		return ary[1];
	}
	norm2(){
		return this.x*this.x+this.y*this.y+this.z*this.z;
	}
	inner( v ){
		return this.x*v.x+this.y*v.y+this.z*v.z;
	} 

}
