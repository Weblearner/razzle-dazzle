/*
A faire : 
	
	- Change universe
	- volume up and down
	- 
	- penser à d'autres options. 
*/






var d = 14; // largeur
var h= 20; // hauteur
var compt = 0; // nombre de cellules vivante autour de la cellule
var comptCell = 0; // nombre de cellules qui sont nées
var w;
var play=false;
var w2;
var z;
var z2;
var vitesse=2500;
var create=true;
var tab1; // grille des valeurs courantes
var tab2; // grille temporaire
var tab3=new Array(d); //position tourelle
var tab4; //tir
var lifeCompt=50;
var timerShoot;
var vitesseShoot=520;//4 -75 300
var timerMoveShoot;
var vitesseMoveShoot=12.5;//4 -25 100
var shootActive=false;
var timer;
var nbShooter=1;//2 +2 1
var niveau = 1;
var PriceAddShooter=2000;
var PriceAddSpeed=300;
var PriceAddRate=200;
var PriceLife=2000;
var score=0;
var scoreMax=0;
var bossLife=400;



function launch()
{

	if (play==false)
	{
		
		clearInterval(timer);
		clearInterval(timerShoot);
		clearInterval(timerMoveShoot);
		timerShoot=setInterval(function() { shoot(); }, vitesseShoot );
		timerMoveShoot=setInterval(function() { moveShoot(); }, vitesseMoveShoot );
		timer = setInterval(function() { game(); }, vitesse); 
		play=true;
		document.getElementById('play').id='pause';



	}
		else
	{
		clearInterval(timer);
		clearInterval(timerShoot); 
		clearInterval(timerMoveShoot);
		document.getElementById('pause').id='play';
		play=false;
	}
}



function addShooter()
{
	if(comptCell>=PriceAddShooter && nbShooter<8)
	{
		nbShooter++;
		comptCell=comptCell-PriceAddShooter;
		PriceAddShooter=PriceAddShooter*2;
		document.getElementById('content1-5').innerHTML=PriceAddShooter+" $$";

	}
	if(nbShooter==8)
	{
		document.getElementById('content1-5').innerHTML='max';
	}
	document.getElementById('container1-2').innerHTML=comptCell+" $$";
	

}

function addSpeed()
{
	
	if(comptCell>=PriceAddSpeed && vitesseMoveShoot>25)
	{
		vitesseMoveShoot=vitesseMoveShoot-25;
		comptCell=comptCell-PriceAddSpeed;
		PriceAddSpeed=PriceAddSpeed*3;
		document.getElementById('content1-6').innerHTML=PriceAddSpeed+" $$";
		
		
		

	}
	if(vitesseMoveShoot==25)
	{
		document.getElementById('content1-6').innerHTML='max';
	}
	document.getElementById('container1-2').innerHTML=comptCell+" $$";
	
}

function addRate()
{	
	if(comptCell>=PriceAddRate && vitesseShoot>100)
	{
		comptCell=comptCell-PriceAddRate;
		vitesseShoot=vitesseShoot-100
		PriceAddRate=PriceAddRate*3;
		document.getElementById('content1-7').innerHTML=PriceAddRate+" $$";
		launch();
		launch();
		

		


	}
	if(vitesseShoot==20)
	{
		document.getElementById('content1-7').innerHTML='max';
	}
	document.getElementById('container1-2').innerHTML=comptCell+" $$";
	
}

function addLife()
{
	if(comptCell>=PriceLife )
	{
		comptCell=comptCell-PriceLife;
		lifeCompt=50;
		var texte="";
		    for (var i = 50; i > 0; i--) 
		    {

		    	if (i>lifeCompt)
		    	{
		    		texte=texte+"<div class='death'></div>"
		    	}
		    	else
		    	{
		    		texte=texte+"<div class='life'></div>"
		    	}
		    	
		    	
		    }

			document.getElementById("container1-3").innerHTML=texte;
		

	}
	
	document.getElementById('container1-2').innerHTML=comptCell+" $$";
}


function deleteShooter()
{
	if(nbShooter>0)
	{
		nbShooter--;
		nbShooter--;
	}
}











function control(e)
{
	if( e.keyCode == 80)
	{		    
		launch();	     	
	}
	
	if( e.keyCode == 107)
	{		    
		addLife();	     	
	}

	if( e.keyCode == 67)
	{		    
		vitesseShoot=1; 
		clearInterval(timerShoot);
		timerShoot=setInterval(function() { shoot(); }, vitesseShoot );    	
	}
	if (e.keyCode==86)
	{
		comptCell=comptCell+1000000;
	}
	
	
	
	
	else
	{
		console.log(e.keyCode);
	}

}






function initialisation()
{
 	tab1 = new Array(h); // grille des valeurs courantes
	tab2 = new Array(h); 
	tab4 = new Array(h); 
	for (var i = 0; i < h; i++) 
	{
		tab1[i] = new Array(d); // inception de tableau pour avoir un tableau en 2D
		tab2[i] = new Array(d);
		tab4[i] = new Array(d); 

		for (var j = 0; j < d; j++)
		{
			
			tab1[i][j] = false;	
			document.write("<div id='col_"+i+" line_"+j+" ' class='div2' ></div>");
			
		}
		document.write('</br>');
	}
}	

function shooter(variable1,variable2)
{
		
	i=variable1;
	j=variable2;

	

	var element = document.getElementById("col_"+i+" line_"+j+" ");
	element.className='div3';
	tab3[j]=true;



	document.addEventListener('keydown', deplace);
}


function deplace(e)
{

		
		if (play==true)
		{
			

		    if( e.keyCode == 37 && j>parseInt(nbShooter/2))
		     {
		     	
		     	var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='div2';
				tab3[j]=false;
				j=j-1;
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='div3';
				tab3[j]=true;
		     	
		     	
		     		
		     	
		    	
		       
		    }
		    if( e.keyCode == 39 && j<d-1 && j<d-parseInt(nbShooter/2)-1)
		    {
		    	var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='div2';
				tab3[j]=false;
				j=j+1;
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='div3';
				tab3[j]=true;
		       
		    }
		}
}


function shoot()
{
		 
		var a=i-1;
		var b=j;
		if (nbShooter%2==0) 
		{

			for (var x = 0; x < nbShooter+1 ; x++)
			{
			//tab4[a][b+x-parseInt(nbShooter/2)]=true;

			
				if (x==nbShooter/2) 
				{
					tab4[a][b]=false;
				} 

				else
				{
					tab4[a][b+x-parseInt(nbShooter/2)]=true;

				}
			}
		} 

		else
		{
			for (var x = 0; x < nbShooter ; x++)
			{
				tab4[a][b+x-parseInt(nbShooter/2)]=true;
			}
		}
}


function moveShoot()
{

	for (var a = 0; a < h; a++) 
	{
		for (var b = 0; b < d; b++) 
		{
			/*if(tab4[0][b]==true )
			{

				if (tab1[0][b]!=false) {comptCell++;};
				tab1[0][b]=false;
				tab2[0][b]=false;
				tab4[0][b]=false;
				document.getElementById("col_"+0+" line_"+b+" ").className="div2";
			}*/


			if(tab4[a][b]==true && tab1[a][b]!=false)
			{
	
				
				if (tab1[a][b]==1) 
				{
					tab1[a][b]=false;
					tab2[a][b]=false;
					tab4[a][b]=false;
					document.getElementById("col_"+a+" line_"+b+" ").className="div2";
					comptCell++;		
					score=score+10;
				}
				

				else if (tab1[a][b]==2) 
				{
					tab1[a][b]=1;
					tab4[a][b]=false;
					document.getElementById("col_"+a+" line_"+b+" ").className="monster";
					comptCell=comptCell+2;
					score=score+20;
				}
				else if (tab1[a][b]==3) 
				{
					tab1[a][b]=2;
					tab4[a][b]=false;
					document.getElementById("col_"+a+" line_"+b+" ").className="div5";
					comptCell=comptCell+3;
					score=score+30;
				}
				else if (tab1[a][b]==4) 
				{
					tab1[a][b]=3;
					tab4[a][b]=false;
					document.getElementById("col_"+a+" line_"+b+" ").className="div6";
					comptCell=comptCell+4;
					score=score+40;
				}
			
				document.getElementById("container1-2").innerHTML=comptCell+" $$";
				console.log(comptCell);
				document.getElementById('score').innerHTML='score : '+score;
				

				
				

				/* 
				for (var x = -1; x < 2; x++) 
				{
					for (var z = -1; z < 2; z++) 
					{
						tab1[a][b]=false ;
						tab2[a][b]=false;
						document.getElementById("col_"+(a+x)+" line_"+(b+z)+" ").className="div2";
					}
					
				}*/
			}
			
			if(tab4[a][b]==true && a>0)
			{
				tab4[a-1][b]=true;
				document.getElementById("col_"+(a-1)+" line_"+b+" ").className="div4";
				tab4[a][b]=false;
				document.getElementById("col_"+a+" line_"+b+" ").className="div2";
				
			

			}
			if(tab4[a][b]==true && a==0 && tab1[a][b]==false )
			{
				tab4[a][b]=false;
				document.getElementById("col_"+a+" line_"+b+" ").className="div2";
			}
			

		}	
	}
	if(niveau>31)
	{
		for (var i = 0; i < 4 ; i++) 
		{
			for (var j = (d/2)-4; j <(d/2)+4;  j++)
			{
				tab1[i][j]=5;
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='boss';
			}
		}
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

function display()
{
	document.getElementById('superContainer').style.width="50px";
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
	

function game()
{

		// Gestion des boutons play, pause, accélerer, décélérer
		// Gestion du time lapse
		for (var i = 0; i < h-1; i++) 
		{
			 
		
			for (var j = 0; j < d; j++)
			{
				// vérification cellules aux alentours
				
			
					if (i==0)
					{
						w=0;
						z=2;
					}
					else if (i==h-1)
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
							if(tab1[i+x][j+y]!=false)
							{
								compt++; 
							}
						}
					}



					if (tab1[i][j]!=false) 
					{
						if ( compt>=3&&compt<=4) 
						{
							tab2[i][j] = tab1[i][j];
						}

						else
						{
							
							
								tab2[i][j]=false;
							
						}
					}
					else
					{
						if (compt==3) 
						{
							var random= Math.floor((Math.random() * 10) + 1);
							if (niveau/10 < 1)
							{
								if (niveau <= random)
								{
									tab2[i][j] = 1;
									var element = document.getElementById("col_"+i+" line_"+j+" ");
									element.className='div1';
								}
								else 
								{
									tab2[i][j] = 2;
									var element = document.getElementById("col_"+i+" line_"+j+" ");
									element.className='div5';
									
								}
							}
							else if (niveau/10 < 2)
							{
								if (niveau/2 <= random)
								{
									tab2[i][j] = 2;
									var element = document.getElementById("col_"+i+" line_"+j+" ");
									element.className='div5';
								}
								else 
								{
									tab2[i][j] = 3;
									var element = document.getElementById("col_"+i+" line_"+j+" ");
									element.className='div6';
									
								}
							}
							else 
							{
								if (niveau/3 <= random)
								{
									tab2[i][j] = 3;
									var element = document.getElementById("col_"+i+" line_"+j+" ");
									element.className='div6';
								}
								else 
								{
									tab2[i][j] = 4;
									var element = document.getElementById("col_"+i+" line_"+j+" ");
									element.className='div7';
									
								}
							}
							
					
						
						} 

						else
						{
							tab2[i][j] = false;
							
						}
					}
					
				
					compt=0; // réinitialisation du compteur de cases aux alentours.

			
					// sinon dans tout les autres cas la cellule recevra la valeur false car
					// elle soit morte soit inexistante
				}
		}
		
		
		for (var j = 0; j <d;  j++) 
		{
			if (tab1[h-2][j]!=false)
			{
				lifeCompt--;
				
				
			}
		}
			

		for (var i = 0; i < h-1; i++) 
		{
			
		
			for (var j = 0; j <d ; j++)
			{
				
				
				tab1[i+1][j]=tab2[i][j];
				tab2[i][j]=false;
				
				
				
			
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				if (tab3[j]==true && i==h-1) 
				{
					element.className='div3';
				}
				else if(tab4[i][j]==true)
				{
					element.className='div4';
					
				}
				else if(tab1[i][j]!=false)
				{
					if (tab1[i][j]==1) 
					{
						element.className='div1';
					} 

					else if (tab1[i][j]==2) 
					{
						element.className='div5';
					}

					else if (tab1[i][j]==3) 
					{
						element.className='div6';
					}
						else if (tab1[i][j]==4) 
					{
						element.className='div7';
					}
					
					
				}
				else 
				{
					element.className='div2';

				}
				
	
			}

		
		}
		if(niveau>31)
	{
		for (var i = 0; i < 4 ; i++) 
		{
			for (var j = (d/2)-4; j <(d/2)+4;  j++)
			{
				tab1[i][j]=5;
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='boss';
			}
		}
	}
	if (niveau>25) 
				{
					
					
					if(Math.floor((Math.random() * 15) + 1)<(niveau-25))
					{
						change();
					}
					
				}

		
		if (lifeCompt<1)
		{
					
			
			clearInterval(timer);
			clearInterval(timerShoot); 
			clearInterval(timerMoveShoot);
			resetGame();
			play=true;
		    console.log(lifeCompt);
			launch();
			if (niveau==30)
			{
				bossLife=400;
			}
			lifeCompt=50;
			scoreMax=score;
			score=0;
			comptCell=parseInt(comptCell/2);
			document.getElementById("scoreMax").innerHTML="meilleur score : "+scoreMax;
			document.getElementById("score").innerHTML="score : "+score;
			document.getElementById("content1-2").innerHTML=comptCell+" $$";

			
			


			

		}
		else

		{
			verifGame();
		}
		var texte="";
		    for (var i = 50; i > 0; i--) 
		    {
		    	console.log(lifeCompt);

		    	if (i>lifeCompt)
		    	{
		    		texte=texte+"<div class='death'></div>";
		    	}
		    	else
		    	{
		    		texte=texte+"<div class='life'></div>";
		    	}
		    	if (lifeCompt<1)
		    	{
		    	 scoreMax=score;
		    	

		    	}
		    	
		    	
		    }

			document.getElementById("container1-3").innerHTML=texte;
			document.getElementById("container1-4").innerHTML="niveau "+niveau+" / 30";
			document.getElementById("container1-2").innerHTML=comptCell+" $$";
	
		
		
		
	
		// à la grille des valeurs  courante
}

function resetGame()
{
 	
	document.removeEventListener("keydown", deplace);

	
	

	
	for (var i = 0; i < h; i++) 
	{
			
		
		for (var j = 0; j < d; j++)
		{

			tab4[i][j]=false;
			if ((i<h/2&& Math.floor((Math.random() * 10) + 1)>6)||i==0)
			{
						var random= Math.floor((Math.random() * 10) + 1);
						if (niveau <= 9)
						{
							if (niveau <= random)
							{
								tab1[i][j] = 1;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div1';
							}
							else 
							{
								tab1[i][j] = 2;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div5';
								
							}
						}
						else if (niveau <= 19)
						{
							if (niveau%10 <= random)
							{
								tab1[i][j] = 2;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div5';
							}
							else 
							{
								tab1[i][j] = 3;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div6';
								
							}
						}
						else if (niveau < 30)
						{
							if (niveau%10 <= random)
							{
								tab1[i][j] = 3;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div6';
							}
							else 
							{
								tab1[i][j] = 4;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div7';
								
							}
							
						}
						else if (niveau == 30)
							{
								tab1[i][j] = 4;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div7';
							}
						else
						{
							tab1[i][j] = false;	

							var element = document.getElementById("col_"+i+" line_"+j+" ");
							element.className='div2';
						}

						
						
			}
			
			
			else
			{
				tab1[i][j] = false;


				var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='div2';
			}
				
				
				
			
				
		}
	}
	if(niveau>31)
	{
		for (var i = 0; i < 4 ; i++) 
		{
			for (var j = (d/2)-4; j <(d/2)+4;  j++)
			{
				tab1[i][j]=5;
				var element = document.getElementById("col_"+i+" line_"+j+" ");
				element.className='boss';
			}
		}

	}
		
		console.log(vitesse);
		shooter(h-1,d/2);
		
			
}


function verifGame()
{	
	var i=0;
	var j=0;
	var over=true;
	while(i<h && over==true)
	{
		while(j<d && over==true)
		{
			if (tab1[i][j]!=false&&tab1[i][j]!=5)
			{
				over=false;
				
			}
			j++
			
			
		}
		j=0;
		i++;
	}
	if (over==true)
	{
		
		clearInterval(timer);
		clearInterval(timerShoot); 
		clearInterval(timerMoveShoot);
		
		
		niveau++;
		if (niveau>30)
		{
			niveau=1;
		}
		
				
		resetGame();
		vitesse=1500-(niveau*40);
		play=false;
		launch();		
		
		console.log(vitesse);

		document.getElementById("container1-4").innerHTML="niveau "+niveau+" / 30";
		document.getElementById("container1-2").innerHTML=comptCell+" $$";
		
		

		
	}
}





function gameOver()
{	
	clearInterval(timerShoot);
	clearInterval(timerMoveShoot);
	clearInterval(timer);
	comptCell=0;
	document.getElementById("container1-2").innerHTML=comptCell+" / 1 000 000 000";
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

function change()
{
	for (var i = 0; i < h; i++) 
	{
			
		
		for (var j = 0; j < d; j++)
		{

			if ((i<h/2&& Math.floor((Math.random() * 10) + 1)>5)||i==0)
			{
						var random= Math.floor((Math.random() * 10) + 1);
						if (niveau <= 9)
						{
							if (niveau <= random)
							{
								tab1[i][j] = 1;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div1';
							}
							else 
							{
								tab1[i][j] = 2;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div5';
								
							}
						}
						else if (niveau <= 19)
						{
							if (niveau%10 <= random)
							{
								tab1[i][j] = 2;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div5';
							}
							else 
							{
								tab1[i][j] = 3;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div6';
								
							}
						}
						else if (niveau < 30)
						{
							if (niveau%10 <= random)
							{
								tab1[i][j] = 3;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div6';
							}
							else 
							{
								tab1[i][j] = 4;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div7';
								
							}
							
						}
						else if (niveau == 30)
							{
								tab1[i][j] = 4;
								var element = document.getElementById("col_"+i+" line_"+j+" ");
								element.className='div7';
							}
					
						
						
			}
			
			
					
				
				
			
				
		}
	}
}
document.addEventListener('keydown', control);
initialisation();
resetGame();


