const RenderSelectOptions = ({ options, defaultText, disabledOptions = [] }) => (
  <>
    <option value="" disabled hidden>
      {defaultText}
    </option>
    {options.map(({ id, name }) => (
      <option key={id} value={name} disabled={disabledOptions.includes(name)}>
        {name}
      </option>
    ))}
  </>
);

export default RenderSelectOptions;
