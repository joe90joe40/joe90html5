<!DOCTYPE html>
<html>
	<head>
		<title>Test</title>
		<link rel="stylesheet" text="text/css" href="css/layout.css" />
		<script data-main="js/main" src="js/require.js"></script>
	</head>
	<body>
		<header>
			<div class="button-panel"></div>
		</header>
		<section>
		    <h1>Backbone Twitter example</h1>
            <button class="open-modal">Open modal</button>
		    <hr />
		    <ul id="tweets-container"></ul>
		    <br />
		</section>
		<footer>
			Footer Container.
		</footer>
		<div class="modal-overlay"></div>
		<div class="modal-container">
		    <div class="box">
                <div class="title">
                    <span>Title</span>
                    <button class="close">X</button>
                </div>
                <div class="content"></div>
            <div>
		</div>
	</body>
</html>