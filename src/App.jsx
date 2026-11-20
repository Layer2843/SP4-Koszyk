import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const produkty = [
    { id: 1, nazwa: 'Notes', cena: 12.50 },
    { id: 2, nazwa: 'Długopis', cena: 3.20 },
    { id: 3, nazwa: 'Plecak', cena: 89.00 },
    { id: 4, nazwa: 'Kalkulator', cena: 45.90 },
    { id: 5, nazwa: 'Zakreślacz', cena: 4.75 },
  ];

  const [koszyk, setKoszyk] = useState([]);

  function obliczSume(elementy) {
    return elementy.reduce((suma, pozycja) => suma + pozycja.cena * pozycja.ilosc, 0);
  }

  function dodajDoKoszyka(produkt) {
    const czyWKoszyku = koszyk.some((pozycja) => pozycja.id === produkt.id);
    let nowyKoszyk;

    if (czyWKoszyku) {
      nowyKoszyk = koszyk.map((pozycja) => {
        if (pozycja.id === produkt.id) {
          return { ...pozycja, ilosc: pozycja.ilosc + 1 };
        }
        return pozycja;
      });
    } else {
      nowyKoszyk = [...koszyk, { ...produkt, ilosc: 1 }];
    }

    setKoszyk(nowyKoszyk);
    console.log(`Koszyk: ${nowyKoszyk.length} pozycji; suma: ${obliczSume(nowyKoszyk).toFixed(2)}`);
  }

  function usunZKoszyka(id) {
    const nowyKoszyk = koszyk.filter((pozycja) => pozycja.id !== id);
    setKoszyk(nowyKoszyk);
    console.log(`Koszyk: ${nowyKoszyk.length} pozycji; suma: ${obliczSume(nowyKoszyk).toFixed(2)}`);

  }

  const sumaKoszyka = obliczSume(koszyk);

  return (
    <div className="container my-4">
      <h2>Sklepik szkolny</h2>

      <ul className="list-group mb-4">
        {produkty.map((produkt) => (
          <li
            key={produkt.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {produkt.nazwa} - {produkt.cena.toFixed(2)} zł
            </span>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => dodajDoKoszyka(produkt)}
            >
              Do koszyka
            </button>
          </li>
        ))}
      </ul>

      <h3>Koszyk ({koszyk.length} pozycji)</h3>

      {koszyk.length === 0 ? (
        <div className="alert alert-info">Koszyk jest pusty</div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Ilość</th>
                <th>Cena</th>
                <th>Suma</th>
                <th>Akcja</th>
              </tr>
            </thead>
            <tbody>
              {koszyk.map((pozycja) => (
                <tr key={pozycja.id}>
                  <td>{pozycja.nazwa}</td>
                  <td>{pozycja.ilosc}</td>
                  <td>{pozycja.cena.toFixed(2)} zł</td>
                  <td>{(pozycja.cena * pozycja.ilosc).toFixed(2)} zł</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => usunZKoszyka(pozycja.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fw-bold">Suma: {sumaKoszyka.toFixed(2)} zł</p>
        </div>
      )}
    </div>
  );
}

export default App;