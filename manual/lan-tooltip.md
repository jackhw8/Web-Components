# LANTooltip

Display prompt information for mouse hover, click and focus.

## Basic Usage

```html
<lan-tooltip>
  <lan-button>Button</lan-button>
</lan-tooltip>
```

<img src="https://i.imgflip.com/32hj07.gif" title="made at imgflip.com"/>

## Attributes

| Attribute     | Description                                                                                      | Type    | Accepted Values                                                                                           | Default Value |
| ------------- | ------------------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| effect        | tooltip theme                                                                                    | string  | dark/light                                                                                                | dark          |
| content       | display content                                                                                  | string  | -                                                                                                         | -             |
| placement     | position of tooltip                                                                              | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom        |
| value/v-model | visibility of tooltip                                                                            | boolean | -                                                                                                         | false         |
| disabled      | whether tooltip is disabled                                                                      | boolean | -                                                                                                         | false         |
| offset        | offset of the tooltip                                                                            | number  | -                                                                                                         | 0             |
| visible-arrow | whether tooltip arrow is visible                                                                 | boolean | -                                                                                                         | true          |
| open-delay    | delay of appearance, in millisecond                                                              | number  | -                                                                                                         | 0             |
| manual        | whether to control Tooltip manually. mouseenter and mouseleave won't have effects if set to true | boolean | -                                                                                                         | false         |
| enterable     | whether the mouse can enter the tooltip                                                          | boolean | -                                                                                                         | false         |
| hide-after    | timeout in milliseconds to hide tooltip                                                          | number  | -                                                                                                         | 500           |
| event         | event on which tooltip appears                                                                   | string  | hover/click/focus                                                                                         | hover         |
