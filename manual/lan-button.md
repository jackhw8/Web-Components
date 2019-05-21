# LANButton

Commonly used button

## Basic Usage

**Default**

<img src="https://i.imgflip.com/31dmsr.gif">

``` html
<lan-button>Default</lan-button>
<lan-button type="primary">Primary</lan-button>
<lan-button type="success">Success</lan-button>
<lan-button type="info">Info</lan-button>
<lan-button type="warning">Warning</lan-button>
<lan-button type="danger">Primary</lan-button>
```

**Plain**

<img src="https://i.imgflip.com/31dmkh.gif">

``` html
<lan-button plain>Default</lan-button>
<lan-button type="primary" plain>Primary</lan-button>
<lan-button type="success" plain>Success</lan-button>
<lan-button type="info" plain>Info</lan-button>
<lan-button type="warning" plain>Warning</lan-button>
<lan-button type="danger" plain>Primary</lan-button>
```

**Round**

<img src="https://i.imgflip.com/31dn5k.gif">

``` html
<lan-button round>Default</lan-button>
<lan-button type="primary" round>Primary</lan-button>
<lan-button type="success" round>Success</lan-button>
<lan-button type="info" round>Info</lan-button>
<lan-button type="warning" round>Warning</lan-button>
<lan-button type="danger" round>Primary</lan-button>
```

## Attributes



The **size** attribute is used to control the size of the button

<img src="https://i.imgflip.com/31dl7y.gif">

``` html
<lan-button size="default">Default</lan-button> 
<lan-button size="medium">Medium</lan-button> 
<lan-button size="small">Small</lan-button> 
<lan-button size="mini">Mini</lan-button> 
```



The **disabled** attribute determines if the button is disabled

<img src="https://i.imgflip.com/31dnp4.gif">

``` html
<lan-button size="default">Default</lan-button> 
<lan-button size="medium">Medium</lan-button> 
<lan-button size="small">Small</lan-button> 
<lan-button size="mini">Mini</lan-button> 
```

***

**Integration with Bootstrap**

The LANButton is also integrated with bootstrap. Just use bootstrap like you normally would

<img src="https://i.imgflip.com/31gw03.gif" title="made at imgflip.com"/>
``` html
<lan-button class="btn btn-dark btn-block"></lan-button>
```

## Using with JavaScript

To use the lan-button you will need to use JavaScript to connect the button

``` JavaScript
const lanButton = document.querySelector('lan-button');
lanButton.addEventListener('click', () => {
    alert('Button Clicked');
    // do something
})
```