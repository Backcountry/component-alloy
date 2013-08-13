component-alloy
===============

Component support for Titanium's Alloy framework.

### Prerequisites

Knowledge and understanding of the [Component Framework](http://github.com/component/component) and Titanium's [Alloy Framework](http://github.com/appcelerator/alloy)

### Setup

1. Install component-alloy into the 'plugins' directory located at the root of your Titanium/Alloy project.
2. Update your tiapp.xml to use the component-alloy plugin.
3. Place your component.json file in the 'app' directory.
4. Install your remote components by going to the 'app' directory in a terminal and run 'component install -f'.
5. You are ready to go!

### Using a component in Alloy

In any Alloy js file you can access a component with the following:

    var myCoolComponent = require('component')('my-cool-component');
    

### Alloy Widgets as Components

With Component it's very easy to distribute your reusable Alloy Widget.  As with normal Components, just create a repo on Github for your Widget.  In addition to your normal widget files, add a 'component.json' to your repo in the same directory as your 'widget.json'.

Here is an example of a Widget's 'component.json' file:

    {
        "name":"panels",
        "version":"0.0.1",
        "files":[
            "widget.json",
            "controllers/widget.js",
            "styles/widget.tss",
            "views/widget.xml",
            "assets/images/pixel.png"
        ]
     }
