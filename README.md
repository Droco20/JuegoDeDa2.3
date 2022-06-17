# JuegoDeDa2
Taller 6 cantera 2.3 - Ejercicio caso práctico de una página dinámica

Juego de dados para múltiples jugadores.

Para iniciar el juego se deben ingresar los jugadores a traves del siguiente enlace:
POST http://localhost:3000/createGame
Request de creación de juego, con su respectivo formulario.
este lleva posteriormente  a mostrar los datos del juego recien creado.

2. Query para consultar el juego y su estado (listado de jugadores y estados como tal del juego)
GET: http://localhost:3000/game/fffff-ggg-jjjjj se debe agregar el id del juego creado
para poder ver los datos de este. 

3. Query para determinar el ganador del juego (una vista con el ganador)
GET http://localhost:3000/game/fffff-ggg-jjjjj/winner 

4. Request para iniciar el juego con la apuesta por cada jugador (acción que permita iniciar el juego)
POST http://localhost:8080/startGame 
Request de inicio del juego, con su respectivo formulario.
este lleva posteriormente  a mostrar los datos del juego y su apuesta.

NOTA: se debe cambiar el id simulado (fffff-ggg-jjjjj) por el id original que da como resultado desde el momento de la creacion del juego.
