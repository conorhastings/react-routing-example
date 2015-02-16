 /**
 * @jsx React.DOM
 */
(function(){
  	var Router = ReactRouter;
  	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;



 	var App = React.createClass({
 		render: function(){
 			return(
 				<div>
	 				<h1>This is going to show up on every page!</h1><br />
	 				<Link to="app">Home</Link> <br />
	 				<Link to="first">First Route</Link> <br />
	 				<Link to="second">Second Route</Link>
	 				<RouteHandler/>
	 			</div>
 			);

 		} 	
 	})
 	

 	var FirstRoute = React.createClass({
 		mixins: [Router.Navigation],
 		showDynamicMessage: function(){
 			var inputText = this.refs.dynamic.getDOMNode().value;

 			this.transitionTo(':dynamicMessage', {dynamicMessage: inputText});
 		},
 		handleEnter: function(e){
 			if(e.which === 13){
 				this.showDynamicMessage()
 			}
 		},
 		
 		render: function(){
 			return(
 				<div>
 					<h3>This is one page</h3>
 					<h5>Input a message and display a dynamic Route!</h5>
 					<input type="text" ref="dynamic" onKeyDown = {this.handleEnter} /><button onClick={this.showDynamicMessage}>Click Me!</button>
 					<RouteHandler/>
 				</div>
 			);

 		} 	 		
 	})
 	

 	var SecondRoute = React.createClass({
 		render: function(){
 			return(
 				<h3>This is a another page</h3>
 			);

 		} 	 		
 	})
 	var DynamicMessage = React.createClass({
 		mixins: [Router.State],
 		render: function(){
 			var style = {color:"red", fontWeight:900}
 			return(
 				<div>
 					<h3>Nested Routes and passing parameters in the URL!</h3>
 					<h1>Is this what you typed? <span style={style}>{this.getParams().dynamicMessage}</span></h1>
 				</div>
 			);

 		} 	 		
 	})

	 var routes = (
	  <Route name="app" path="/" handler={App}>
	    <Route name="first" handler={FirstRoute}>
	    	<Route name=":dynamicMessage" handler={DynamicMessage} />
	    </Route>
	    <Route name="second" handler={SecondRoute}/>
	  </Route>
	);
	 Router.run(routes, function (Handler) {
 		React.render(<Handler />, document.getElementById("container"));
	});




})();