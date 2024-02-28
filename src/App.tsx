import React, { useEffect, useState } from "react";
import "./App.css";

type Country = {
  name: string;
  id: number;
};

type CustomCheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
  numberKey?: string | number;
};

const dataCountries: Country[] = [
  { id: 1, name: "USA" },
  { id: 2, name: "Canada" },
  { id: 3, name: "Mexico" },
  { id: 4, name: "Brazil" },
  { id: 5, name: "France" },
];

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    const getCountries = () => {
      setCountries(dataCountries);
    };
    getCountries();
  }, []);

  useEffect(() => {
    const allSelected = countries.every((country) =>
      selectedCountries.includes(country.id)
    );
    setSelectAll(allSelected);
  }, [selectedCountries, countries]);

  const toggleCountry = (id: number) => {
    const updatedSelectedCountries = selectedCountries.includes(id)
      ? selectedCountries.filter((countryId) => countryId !== id)
      : [...selectedCountries, id];
    setSelectedCountries(updatedSelectedCountries);
    setSelectAll(false);
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    const updatedSelectedCountries = newSelectAll
      ? countries.map((country) => country.id)
      : [];
    setSelectedCountries(updatedSelectedCountries);
    setSelectAll(newSelectAll);
  };

  const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    onChange,
    label,
    numberKey,
  }) => {
    return (
      <label className="checkbox" key={numberKey}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <CustomCheckbox
          onChange={toggleSelectAll}
          checked={selectAll}
          label="Select All"
        />
        {countries.map((country: Country, i: number) => (
          <CustomCheckbox
            key={country.id}
            checked={selectedCountries.includes(country.id)}
            onChange={() => toggleCountry(country.id)}
            label={country.name}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
