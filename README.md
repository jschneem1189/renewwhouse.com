ReNEWW website
=========
Whirlpool Corporation, along with Purdue University, will transform an existing home near Purdue’s campus into a world class research laboratory and sustainable living showcase. ReNEWW House will provide valuable insights for our homebuilder partners and customers on technologies that enable sustainable living. We will leverage the world class facilities and collaborate with Purdue researchers to accelerate the development of the next generation of ultra-high efficiency appliances that increase core performance while lowering their impact on the environment and cost to operate.

------------------------------

This is the website that will display to the world our mission, our progress, and our success - as well as highlight the partners that have helped to enable our vision.

# Build Process
- grunt debug<br>
This command will essentially compile all of the LESS files to CSS so that you can launch the index.html file and have access to the latest styles for debugging purposes

- grunt release<br>
This should be run before pushing to production. It will wipe the whole /build folder, and then uglify all of the JS files, compile all of the LESS to CSS, resize all of the images for download performance, create image thumbnails, minify all of the generated CSS, rename image files, and create a special configuration file that indicates debug vs prod so that the PHP file knows what address to go to. After running this file, you'll need to copy the whole /build folder to the GoDaddy server.

You can always checkout the Gruntfile.js to see exactly what these commands do
