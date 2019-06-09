# LANCard

A container, with an optional drop shadow, to display information.

## Basic Usage

```html
<lan-card>
  Content
</lan-card>
```

<img src="https://i.ibb.co/QMbVr1H/Screen-Shot-2019-06-08-at-3-17-09-AM.png" />

## Attributes

| Attribute  | Description                          | Type   | Accepted Values        | Default Value       |
| ---------- | ------------------------------------ | ------ | ---------------------- | ------------------- |
| header     | card header                          | string | -                      | -                   |
| body-style | customized styling for the card body | string | -                      | { padding: '20px' } |
| shadow     | drop shadow behind the card          | string | always / hover / never | always              |
