/*
A faire : 
	
	- Change universe
	- volume up and down
	- 
	- penser à d'autres options. 
*/






var d = 30; // dimension du carré
var compt = 0; // nombre de cellules vivante autour de la cellule
var w;
var w2;
var z;
var z2;
var clic=0; // me permet de compter le nombre de clic sur le bouton plait car la fonction setInterval() c'est de la *@"#@
var vitesse=200;
var create=true;
var tab1; // grille des valeurs courantes
var tab2; // grille temporaire

initialisation();







function initialisation()
{
 	 tab1 = new Array(d); // grille des valeurs courantes
	 tab2 = new Array(d); 
	for (var i = 0; i < d; i++) 
	{
		tab1[i] = new Array(d); // inception de tableau pour avoir un tableau en 2D
		tab2[i] = new Array(d);

		for (var j = 0; j < d; j++)
		{
			
			tab1[i][j] = false;	
			tab2[i][j] = false;	

			
				document.write("<div id='col_"+i+" line_"+j+" ' class='div2'onmouseOver=' if (create==true){modifier(this); coordonne(this);}' ></div>")

			

	
		}
		document.write('</br>');
		
	}
}	


function modifier(monID)
{	

	if(monID.className=='div1')
	{
		monID.className='div2';
	}
	else
	{
		monID.className='div1';
	}
}


function coordonne(monID)
{
	id=monID.id;
	
	var extract1 = id.indexOf("_",0);
	var extract2 = id.indexOf("_",5);
	extract1 = parseInt(id.substr(extract1+1,2)); 
	extract2 = parseInt(id.substr(extract2+1,2)); 

	if (tab1[extract1][extract2]==false)
	{
		tab1[extract1][extract2]=true;	
	}
	else
	{
		tab1[extract1][extract2]=false;	
	}

	console.log(extract1+" "+extract2+" "+tab1[extract1][extract2]);
}
	

function Invert()
{
	for (var i = 0; i < d; i++) 
		{
			
		
			for (var j = 0; j < d; j++)
			{
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				if(tab1[i][j]==true)
				{
					element.className='div2';
					tab1[i][j]=false;
					
				}
				else 
				{
					element.className='div1';
					tab1[i][j]=true;

				}
	
			}
		
		}
}


function reset()
{
	
	for (var i = 0; i < d; i++) 
		{
			
		
			for (var j = 0; j < d; j++)
			{
				tab1[i][j]=false;
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='div2';

				
			}
		
		}
		create = true;
		console.log(create)
}

function erase()
{
	for (var i = 0; i < d; i++) 
		{		
			for (var j = 0; j < d; j++)
			{
				delete tab1[i][j];
				delete tab2[i][j];	
			}
		}	
}	

function game()
{

		// Gestion des boutons play, pause, accélerer, décélérer
		// Gestion du time lapse
		for (var i = 0; i < d; i++) 
		{
			 // inception de tableau pour avoir un tableau en 2D
			 // inception de tableau pour avoir un tableau en 2D
		
			for (var j = 0; j < d; j++)
			{
				// vérification cellules aux alentours
				
					if (i==0)
					{
						w=0;
						z=2;
					}
					else if (i==d-1)
					{
						w=-1;
						z=1;
					}
					else
					{
						w=-1;
						z=2;
					}
					if (j==0)
					{
						w2=0;
						z2=2;
					}
					else if (j==d-1)
					{
						w2=-1;
						z2=1;
					}
					else
					{
						w2=-1;
						z2=2;
					}
					
					for (var x = w; x < z; x++) 
					{
						for (var y = w2; y < z2; y++) 
						{
							if(tab1[i+x][j+y]==true)
							{
								compt++; 
							}
						}
					}

				// cellule qui prend vie 
				// si condition : x==3  alors 
		
				if (compt==3)
				{
					tab2[i][j] = true;
				}
	
				else if (tab1[i][j]==true) 
				{
					if(compt==4)
					{
						tab2[i][j]=true;
					}
					else
					{
						tab2[i][j]=false;
					}
				}
		
				else
				{
					tab2[i][j] = false;
				}
				
				compt=0; // réinitialisation du compteur de cases aux alentours.

		
				// sinon dans tout les autres cas la cellule recevra la valeur false car
				// elle soit morte soit inexistante
			}
		
		
		
		
		}
		
		// permution des données de la grille des valeurs futures 
		for (var i = 0; i < d; i++) 
		{
			
		
			for (var j = 0; j < d; j++)
			{
				tab1[i][j]=tab2[i][j];
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				if(tab1[i][j]==true)
				{
					element.className='div1';
					
				}
				else 
				{
					element.className='div2';

				}
	
			}
		
		}
		verifGame();

	
		// à la grille des valeurs  courante
}

function gameOver()
{
	//G
	var j=0;
	for(var i=4; i<10;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	
	for(var j=0; j<5;j++)
	{
		document.getElementById("col_4 line_"+j+" ").className='div3';
		document.getElementById("col_9 line_"+j+" ").className='div3';
	}
	document.getElementById("col_8 line_4 ").className='div3';
	document.getElementById("col_7 line_4 ").className='div3';
	document.getElementById("col_7 line_3 ").className='div3';

	//A
	var j=6;
	for(var i=4; i<10;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	var j=10;
	for(var i=4; i<10;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	for(var j=7; j<10;j++)
	{
		document.getElementById("col_4 line_"+j+" ").className='div3';
		document.getElementById("col_6 line_"+j+" ").className='div3';
	}
	
	//M
	var j=12;
	for(var i=4; i<10;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	var j=16;
	for(var i=4; i<10;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	document.getElementById("col_5 line_13 ").className='div3';
	document.getElementById("col_6 line_14 ").className='div3';
	document.getElementById("col_5 line_15 ").className='div3';

	//E
	var j=18;
	for(var i=4; i<10;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	
	i=4;
	for(var j=19; j<23;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	i=6;
	for(var j=19; j<22;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	i=9;
	for(var j=19; j<23;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	
	//O
	var j=0;
	for(var i=11; i<17;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	var j=4;
	for(var i=11; i<17;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	i=11;
	for(var j=1; j<4;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	i=16;
	for(var j=1; j<4;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}


	//V
	var j=6;
	for(var i=11; i<15;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}

	var j=10;
	for(var i=11; i<15;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	document.getElementById("col_15 line_7 ").className='div3';
	document.getElementById("col_16 line_8 ").className='div3';
	document.getElementById("col_15 line_9 ").className='div3';

	//E
	var j=12;
	for(var i=11; i<17;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	
	i=11;
	for(var j=13; j<17;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	i=13;
	for(var j=13; j<16;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	i=16;
	for(var j=13; j<17;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}

	//R
	var j=18;
	for(var i=11; i<17;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	var j=22;
	for(var i=11; i<14;i++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	i=11;
	for(var j=19; j<22;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	i=13;
	for(var j=19; j<22;j++)
	{
		document.getElementById("col_"+i+" line_"+j+" ").className='div3';
	}
	document.getElementById("col_14 line_20 ").className='div3';
	document.getElementById("col_15 line_21 ").className='div3';
	document.getElementById("col_16 line_22 ").className='div3';


	setTimeout(function(){reset();}, 2000);
}

function verifGame()
{	
	var i=0;
	var j=0;
	var over=true;
	while(i<d && over==true)
	{
		while(j<d && over==true)
		{
			if (tab1[i][j]==true)
			{
				over=false;
				
			}
			j++;
			
			
		}
		j=0;
		i++;
	}
	if (over==true)
	{
		
		clearInterval(timer); 
		timer=null; 
		clic=0; 
		play=false;
		create = false;
		gameOver();
		console.log(create);
		
		

		
	}
	
}

function changeSize(monID)
{
	
	if (monID.id=="size1")
	{
		d=25;
	}
	else if (monID.id=="size2")
	{
		d=30;
	}
	else if (monID.id=="size3")
	{
		d=35;
	}
	else
	{
		d=40;
	}
	console.log(d);
	initialisation();
}







