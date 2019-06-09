const componentStyle = `
* {
  --bg-color: #ffffff;
  --txt-color: #606266;
  --border-color: #dcdfe6;

  --hover-bg: #EEF5FE;
  --hover-txt: #409eff;
  --hover-border: #409eff;
  
  --border-rad: 4px;

  --padding: 12px 20px;
  --txt-size: 14px;

  --pointer-events: auto;
  --opacity: 1;
}
.button
{
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: var(--txt-size);
  margin: 4px 2px;
  cursor: pointer;
  padding: var(--padding);
  border-radius: var(--border-rad);
  pointer-events: var(--pointer-events);
  opacity: var(--opacity);
}
.default
{
  background-color: var(--bg-color);
  color: var(--txt-color);
  border: 1px solid var(--border-color);
}
.default:hover
{
  background-color: var(--hover-bg);
  color: var(--hover-txt);
  border-color: var(--hover-border);
}
`;

export default componentStyle;
