export function NutritionPanel({ nutritionFacts = [] }) {
  const defaultNutrition = [
    { nutrient: 'Energy', value: '524 kcal' },
    { nutrient: 'Protein', value: '9.8 g' },
    { nutrient: 'Carbohydrates', value: '54.2 g' },
    { nutrient: 'Total Sugars', value: '1.4 g' },
    { nutrient: 'Added Sugars', value: '0 g' },
    { nutrient: 'Total Fat', value: '30.1 g' },
    { nutrient: 'Saturated Fat', value: '6.2 g' },
    { nutrient: 'Trans Fat', value: '0 g' },
    { nutrient: 'Dietary Fibre', value: '6.4 g' },
    { nutrient: 'Sodium', value: '580 mg' }
  ];

  const facts = nutritionFacts.length ? nutritionFacts : defaultNutrition;

  return (
    <section className="zakaas-nutrition-section" aria-label="Nutritional profile">
      <div className="nutrition-container">
        <div className="nutrition-header">
          <div>
            <span className="nutrition-kicker">05 / HONEST NUTRITION</span>
            <h3 className="nutrition-title">NUTRITION AT A GLANCE</h3>
          </div>
          <span className="nutrition-basis-badge">VALUES PER 100g SERVING</span>
        </div>

        <div className="nutrition-table-wrap">
          <table className="nutrition-table">
            <thead>
              <tr>
                <th scope="col">Nutritional Attribute</th>
                <th scope="col" className="text-right">Approx. Value</th>
              </tr>
            </thead>
            <tbody>
              {facts.map((row, idx) => (
                <tr key={idx}>
                  <td className="nutrient-name">{row.nutrient}</td>
                  <td className="nutrient-val text-right">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="nutrition-disclaimer">
          Values are based on standard laboratory analysis of representative batches.
          Prepared with roasted grains, authentic whole spices, and cold-pressed oil without hydrogenated fats.
        </p>
      </div>
    </section>
  );
}
