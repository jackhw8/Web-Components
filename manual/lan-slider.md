# LANSlider

A interactive slider to easily adjust numeric values.

## Basic Usage

```html
<lan-slider min="0" max="100" val="50" onchange="null"></lan-slider>
```

<img src="https://i.ibb.co/2kNKYg7/Screen-Shot-2019-06-08-at-3-29-06-AM.png">

## Attributes

| Attribute | Description                                                         | Type     | Accepted Values | Default Value |
| --------- | ------------------------------------------------------------------- | -------- | --------------- | ------------- |
| min       | minimum value of the slider                                         | int      | -               | 0             |
| max       | maximum value of the slider                                         | int      | -               | 100           |
| val       | actual value of the slider to be displayed                          | int      | -               | 50            |
| onchange  | callback function that is called whenever slider's value is changed | function | -               | null          |

## Usage with JavaScript

To use the lan-button you will need to use JavaScript to connect the button

```JavaScript
function sliderOnChange(event) {
  console.log("New slider value: ", event.target.value);
}

const lanSlider = document.querySelector('lan-slider');
lanSlider.change = sliderOnChange;
})
```
