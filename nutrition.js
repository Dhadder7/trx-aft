/* FORGE nutrition: single-person portions, estimates per listed serving.
   Branded values can change. Compare the package label and enter adjustments in
   the custom log when using a different product or family recipe. */
const FOOD = {
  bagel: {name:"Dave’s Killer Bread Epic Everything bagel",unit:"bagel",aisle:"Bakery & grains",kcal:280,p:13,c:49,f:6},
  rice: {name:"Lundberg Organic Brown Basmati rice, cooked",unit:"cup",aisle:"Bakery & grains",kcal:216,p:5,c:45,f:2},
  pasta: {name:"Whole-wheat pasta, cooked",unit:"cup",aisle:"Bakery & grains",kcal:174,p:7,c:37,f:1},
  potato: {name:"Yukon Gold potatoes",unit:"medium (about 5 oz)",aisle:"Produce",kcal:110,p:3,c:26,f:0},
  avocado: {name:"Avocado",unit:"medium",aisle:"Produce",kcal:240,p:3,c:13,f:22},
  apple: {name:"Apple",unit:"medium",aisle:"Produce",kcal:95,p:0,c:25,f:0},
  grapes: {name:"Grapes",unit:"cup",aisle:"Produce",kcal:104,p:1,c:27,f:0},
  blueberries: {name:"Blueberries",unit:"cup",aisle:"Produce",kcal:84,p:1,c:21,f:0},
  kale: {name:"Kale, raw",unit:"cup",aisle:"Produce",kcal:33,p:2,c:6,f:1},
  broccoli: {name:"Broccoli",unit:"cup",aisle:"Produce",kcal:31,p:3,c:6,f:0},
  peppers: {name:"Bell peppers, chopped",unit:"cup",aisle:"Produce",kcal:30,p:1,c:7,f:0},
  carrots: {name:"Baby carrots",unit:"cup",aisle:"Produce",kcal:50,p:1,c:12,f:0},
  tomatoes: {name:"Cherry tomatoes",unit:"cup",aisle:"Produce",kcal:27,p:1,c:6,f:0},
  chicken: {name:"Chicken breast tenderloins, cooked",unit:"oz cooked",aisle:"Meat & seafood",kcal:47,p:9,c:0,f:1},
  tilapia: {name:"Tilapia, cooked",unit:"oz cooked",aisle:"Meat & seafood",kcal:36,p:7,c:0,f:1},
  salmon: {name:"Salmon, cooked",unit:"oz cooked",aisle:"Meat & seafood",kcal:59,p:7,c:0,f:3.5},
  steak: {name:"Top sirloin steak, trimmed, cooked",unit:"oz cooked",aisle:"Meat & seafood",kcal:57,p:8,c:0,f:2.5},
  egg: {name:"Large eggs",unit:"egg",aisle:"Dairy & eggs",kcal:72,p:6,c:0,f:5},
  yogurt: {name:"Fage Total 2% plain Greek yogurt",unit:"cup",aisle:"Dairy & eggs",kcal:170,p:23,c:8,f:4},
  cottage: {name:"Good Culture 2% cottage cheese",unit:"cup",aisle:"Dairy & eggs",kcal:180,p:26,c:6,f:5},
  milk: {name:"2% milk",unit:"cup",aisle:"Dairy & eggs",kcal:122,p:8,c:12,f:5},
  whey: {name:"Jim Stoppani whey powder (check your tub)",unit:"scoop",aisle:"Pantry & supplements",kcal:120,p:24,c:3,f:2},
  walnuts: {name:"Plain unsalted walnuts",unit:"oz",aisle:"Pantry & supplements",kcal:185,p:4,c:4,f:18},
  honey: {name:"Honey",unit:"tsp",aisle:"Pantry & supplements",kcal:21,p:0,c:6,f:0},
  oil: {name:"Extra-virgin olive oil",unit:"tsp",aisle:"Pantry & supplements",kcal:40,p:0,c:0,f:4.5}
};
const RECIPES = {
  bagelEgg: {name:"Avocado bagel, eggs & blueberries",items:[["bagel",1],["avocado",0.5],["egg",2],["blueberries",0.5]],steps:"Toast the bagel. Mash half an avocado onto it. Serve with two boiled eggs and blueberries."},
  bagelCottage: {name:"Avocado bagel, cottage cheese & fruit",items:[["bagel",1],["avocado",0.5],["cottage",0.75],["apple",1]],steps:"Toast the bagel and top with avocado. Serve cottage cheese and a sliced apple on the side."},
  yogurtBowl: {name:"Greek yogurt, honey, berries & walnuts",items:[["yogurt",1],["honey",2],["blueberries",0.75],["walnuts",0.5]],steps:"Spoon yogurt into a bowl. Add measured honey, blueberries and chopped walnuts."},
  cottageSnack: {name:"Cottage cheese, grapes & walnuts",items:[["cottage",0.75],["grapes",1],["walnuts",0.5]],steps:"Portion cottage cheese and grapes. Add walnuts just before eating."},
  eggSnack: {name:"Boiled eggs, apple & carrots",items:[["egg",2],["apple",1],["carrots",1]],steps:"Hard-boil eggs ahead of time. Pack with a washed apple and baby carrots."},
  shake: {name:"Whey shake in 2% milk",items:[["whey",1],["milk",1]],steps:"Blend or shake one scoop of your actual Stoppani whey with 1 cup cold 2% milk. Check the tub label and adjust the logged values if needed."},
  chickenRice: {name:"Chicken, brown rice & kale bowl",items:[["chicken",5],["rice",1],["kale",1],["peppers",0.5],["tomatoes",0.5],["oil",2]],steps:"Cook chicken to 165°F. Sauté kale and peppers in measured olive oil; add tomatoes. Serve with a cup of cooked rice."},
  chickenPotato: {name:"Chicken, golden potatoes & broccoli",items:[["chicken",5],["potato",2],["broccoli",1.5],["oil",2]],steps:"Roast diced potatoes and broccoli with measured olive oil at 425°F until tender. Cook chicken to 165°F and serve together."},
  salmonRice: {name:"Salmon, brown rice & broccoli",items:[["salmon",5],["rice",1],["broccoli",1.5],["oil",1]],steps:"Bake salmon to 145°F or until it flakes and reaches your preferred safe doneness. Steam broccoli; serve with cooked rice and measured oil."},
  salmonPotato: {name:"Salmon, potatoes & kale",items:[["salmon",5],["potato",2],["kale",1.5],["oil",1]],steps:"Roast potatoes; cook salmon. Sauté kale in a teaspoon of olive oil. Season with herbs, lemon or pepper as desired."},
  tilapiaRice: {name:"Tilapia, brown rice & peppers",items:[["tilapia",6],["rice",1.25],["peppers",1],["kale",1],["oil",2]],steps:"Cook tilapia to 145°F. Sauté peppers and kale with measured olive oil; serve over brown rice."},
  steakPotato: {name:"Top sirloin, potatoes & broccoli",items:[["steak",5],["potato",2],["broccoli",1.5],["oil",1]],steps:"Trim top sirloin and cook to your preferred safe temperature. Roast potatoes and broccoli with a measured teaspoon of oil."},
  pastaChicken: {name:"Family pasta + grilled chicken",items:[["pasta",1.5],["chicken",5],["tomatoes",0.5],["kale",1],["oil",1]],steps:"Measure 1½ cups cooked pasta. Add 5 oz cooked chicken and vegetables. Sauce, cheese and extra oil are not included: log them separately from their labels."},
  familyFish: {name:"Family plate + tilapia",items:[["tilapia",6],["rice",1],["broccoli",1.5],["oil",1]],steps:"Use this as a simple placeholder on a family dinner night. If the family meal differs, uncheck this dinner and log the actual plate in Other food."}
};
const MEAL_PLAN = {
  Monday:["bagelEgg","chickenRice","yogurtBowl","shake","salmonPotato"],
  Tuesday:["bagelCottage","chickenPotato","cottageSnack","shake","tilapiaRice"],
  Wednesday:["bagelEgg","chickenRice","yogurtBowl","shake","pastaChicken"],
  Thursday:["bagelCottage","chickenPotato","eggSnack","shake","salmonRice"],
  Friday:["bagelEgg","chickenRice","cottageSnack","shake","steakPotato"],
  Saturday:["bagelCottage","chickenPotato","yogurtBowl","shake","tilapiaRice"],
  Sunday:["bagelEgg","chickenRice","cottageSnack","shake","familyFish"]
};
const MEAL_LABELS=["Breakfast","Lunch","Snack","Shake","Dinner"];
const NUTRITION_TARGET={kcal:[2200,2500],p:[160,190]};
let nutritionWeek=1,nutritionDay="Monday";
function safeText(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
function foodTotals(recipeId,portions=1){
  return RECIPES[recipeId].items.reduce((t,[id,qty])=>{
    const x=FOOD[id]; for(const k of ["kcal","p","c","f"]) t[k]+=x[k]*qty*portions; return t;
  },{kcal:0,p:0,c:0,f:0});
}
function whole(x){return Math.round(x);}
function macroLine(t){return `${whole(t.kcal)} cal · ${whole(t.p)}g protein · ${whole(t.c)}g carbs · ${whole(t.f)}g fat`;}
function nutritionKey(w,d){return `w${w}-${d}`;}
function nutritionLog(w,d){
  state.nutrition ||= {};
  return state.nutrition[nutritionKey(w,d)] ||= {meals:{},other:[]};
}
function selectedRecipe(log,d,i){return log.meals?.[i]?.recipe || MEAL_PLAN[d][i];}
function mealPortions(log,i){return Number(log.meals?.[i]?.portions || 1);}
function dayNutrition(w,d){
  const log=nutritionLog(w,d), total={kcal:0,p:0,c:0,f:0};
  MEAL_PLAN[d].forEach((_,i)=>{
    if(!log.meals?.[i]?.checked)return;
    const x=foodTotals(selectedRecipe(log,d,i),mealPortions(log,i));
    for(const k in total)total[k]+=x[k];
  });
  (log.other||[]).forEach(x=>{for(const k in total)total[k]+=Number(x[k])||0;});
  return total;
}
function openNutrition(w,d){nutritionWeek=w;nutritionDay=d;navigate("nutrition");}
function renderNutrition(){
  const w=nutritionWeek,d=nutritionDay,log=nutritionLog(w,d);
  const weekOptions=Array.from({length:12},(_,i)=>`<option value="${i+1}" ${w===i+1?"selected":""}>Week ${i+1}</option>`).join("");
  const days=Object.keys(MEAL_PLAN).map(x=>`<button class="nutrition-day ${d===x?"active":""}" onclick="nutritionDay='${x}';renderNutrition()">${x.slice(0,3)}</button>`).join("");
  const meals=MEAL_PLAN[d].map((_,i)=>{
    const id=selectedRecipe(log,d,i),recipe=RECIPES[id],portions=mealPortions(log,i),total=foodTotals(id,portions);
    return `<div class="meal-row">
      <input type="checkbox" aria-label="Eaten ${MEAL_LABELS[i]}" ${log.meals?.[i]?.checked?"checked":""} onchange="setMeal(${i},'checked',this.checked)">
      <div><div class="eyebrow">${MEAL_LABELS[i]}</div><button class="meal-title" onclick="showRecipe('${id}',${portions})">${safeText(recipe.name)} ↗</button><div class="meal-macros">${macroLine(total)}</div>
      ${i===4?`<label class="small-label">Dinner choice <select onchange="setMeal(${i},'recipe',this.value)">${["salmonPotato","salmonRice","tilapiaRice","steakPotato","pastaChicken","chickenPotato","familyFish"].map(key=>`<option value="${key}" ${id===key?"selected":""}>${safeText(RECIPES[key].name)}</option>`).join("")}</select></label><button class="text-button" onclick="replaceDinner()">Log family dinner instead</button>`:""}
      </div><label class="small-label">Portions<input aria-label="Portions for ${MEAL_LABELS[i]}" type="number" min="0.25" max="5" step="0.25" value="${portions}" onchange="setMeal(${i},'portions',this.value)"></label>
    </div>`;
  }).join("");
  const other=(log.other||[]).map((x,i)=>`<div class="other-row"><span><strong>${safeText(x.name)}</strong><br><small>${safeText(x.amount)} · ${macroLine(x)}</small></span><button class="secondary" aria-label="Remove ${safeText(x.name)}" onclick="removeOther(${i})">Remove</button></div>`).join("");
  const t=dayNutrition(w,d);
  app.innerHTML=`<section class="hero"><div class="eyebrow">FORGE • FOOD LOG</div><h1>Meals & nutrition</h1><p>Planned meals repeat each training week. Check only what you actually ate.</p></section>
    <section class="card compact"><label class="small-label">Training week <select onchange="nutritionWeek=Number(this.value);renderNutrition()">${weekOptions}</select></label><div class="nutrition-days">${days}</div></section>
    <section class="card"><div class="eyebrow">LOGGED TODAY</div><h2 id="nutritionTotal">${whole(t.kcal)} calories</h2><div class="macro-grid"><span>${whole(t.p)}g protein</span><span>${whole(t.c)}g carbs</span><span>${whole(t.f)}g fat</span></div><p>Planning guide: about ${NUTRITION_TARGET.kcal[0]}–${NUTRITION_TARGET.kcal[1]} calories and ${NUTRITION_TARGET.p[0]}–${NUTRITION_TARGET.p[1]}g protein. Adjust with your care team or registered dietitian for your recovery, blood pressure and training response.</p></section>
    <section class="card"><h2>${d} meals</h2>${meals}</section>
    <section class="card" id="otherFood"><div class="eyebrow">FAMILY DINNER • SUBSTITUTIONS • EXTRAS</div><h2>Other food</h2><p>Enter the nutrition label for one serving and how many servings you ate. For homemade food, use measured ingredients or a trusted food database first. This app has no food search, so it cannot infer macros from a food name alone.</p>
    ${other||"<p>No other foods logged.</p>"}
    <form id="otherForm" onsubmit="addOther(event)"><div class="nutrition-fields"><label>Food / dish<input name="name" required placeholder="e.g., family pasta"></label><label>Amount eaten<input name="amount" required placeholder="e.g., 1.5 cups"></label><label>Label servings eaten<input name="servings" type="number" step="0.1" min="0.1" value="1" required></label><label>Calories per serving<input name="kcal" type="number" min="0" step="0.1" required></label><label>Protein g per serving<input name="p" type="number" min="0" step="0.1" required></label><label>Carbs g per serving<input name="c" type="number" min="0" step="0.1" required></label><label>Fat g per serving<input name="f" type="number" min="0" step="0.1" required></label></div><button class="primary" type="submit">Add to today’s totals</button></form></section>
    ${d==="Sunday"?groceryHTML(w):`<section class="card compact"><h2>Sunday grocery list</h2><p>Open Sunday to shop for the next Monday–Sunday plan.</p><button class="secondary" onclick="nutritionDay='Sunday';renderNutrition()">Open list →</button></section>`}
    <section class="card compact"><div class="eyebrow">NUTRITION NOTES</div><p>Values are estimates for one person and cooked weights where marked. Store labels and actual portions take priority. This tracker sums calories, protein, carbs and fat; it does not certify vitamin intake. Bring in variety and review any persistent gaps with a dietitian.</p></section>`;
}
function setMeal(i,field,value){
  const log=nutritionLog(nutritionWeek,nutritionDay); log.meals[i]||={};
  if(field==="portions"){
    value=Number(value);if(!Number.isFinite(value)||value<0.25||value>5){alert("Use 0.25 to 5 portions.");renderNutrition();return;}
  }
  log.meals[i][field]=value;saveData();renderNutrition();
}
function showRecipe(id,portions=1){
  const r=RECIPES[id];
  document.getElementById("modalContent").innerHTML=`<div class="eyebrow">RECIPE • ${portions} PORTION${portions===1?"":"S"}</div><h2>${safeText(r.name)}</h2><p>${macroLine(foodTotals(id,portions))} (estimate)</p><h3>Ingredients</h3><ul>${r.items.map(([key,qty])=>`<li>${Number((qty*portions).toFixed(2))} ${safeText(FOOD[key].unit)} ${safeText(FOOD[key].name)}</li>`).join("")}</ul><h3>How to make it</h3><p>${safeText(r.steps)}</p>`;
  document.getElementById("modal").classList.remove("hidden");
}
function replaceDinner(){setMeal(4,"checked",false);document.getElementById("otherFood")?.scrollIntoView({behavior:"smooth"});}
function addOther(event){
  event.preventDefault();const f=new FormData(event.target),servings=Number(f.get("servings"));
  const x={name:String(f.get("name")).trim(),amount:String(f.get("amount")).trim()};
  if(!x.name||!x.amount||!Number.isFinite(servings)||servings<=0)return;
  for(const k of ["kcal","p","c","f"]){const v=Number(f.get(k));if(!Number.isFinite(v)||v<0)return;x[k]=Math.round(v*servings*10)/10;}
  nutritionLog(nutritionWeek,nutritionDay).other.push(x);saveData();renderNutrition();
  document.getElementById("otherFood")?.scrollIntoView();
}
function removeOther(i){nutritionLog(nutritionWeek,nutritionDay).other.splice(i,1);saveData();renderNutrition();}
function groceryItems(w){
  const totals={};
  for(const [d,plan] of Object.entries(MEAL_PLAN))plan.forEach((base,i)=>{
    const log=nutritionLog(w,d),id=selectedRecipe(log,d,i),portions=mealPortions(log,i);
    RECIPES[id].items.forEach(([key,qty])=>totals[key]=(totals[key]||0)+qty*portions);
  });
  return Object.entries(totals).sort((a,b)=>FOOD[a[0]].aisle.localeCompare(FOOD[b[0]].aisle)||FOOD[a[0]].name.localeCompare(FOOD[b[0]].name));
}
function groceryHTML(w){
  const shopWeek=w<12?w+1:1,entries=groceryItems(shopWeek),aisles=[...new Set(entries.map(([key])=>FOOD[key].aisle))];
  state.grocery ||= {};const checks=state.grocery[shopWeek]||{};
  return `<section class="card" id="grocery"><div class="eyebrow">SUNDAY SHOPPING • FOR WEEK ${shopWeek}</div><h2>Grocery list</h2><p>Amounts cover one person’s planned meals for Monday–Sunday. Meat and fish weights are cooked; buy extra raw weight. Family portions, sauces and any other logged food are extra. Dinner swaps in Week ${shopWeek} update this list.</p>${aisles.map(aisle=>`<h3 class="aisle-heading">${safeText(aisle)}</h3>${entries.filter(([key])=>FOOD[key].aisle===aisle).map(([key,qty])=>`<label class="grocery-row"><input type="checkbox" ${checks[key]?"checked":""} onchange="toggleGrocery(${shopWeek},'${key}',this.checked)"><span>${safeText(FOOD[key].name)} <small>— ${Number(qty.toFixed(2))} ${safeText(FOOD[key].unit)}${qty===1?"":"s"}</small></span></label>`).join("")}`).join("")}<button class="secondary" onclick="printGrocery()">Print / save list</button></section>`;
}
function toggleGrocery(w,key,checked){state.grocery||={};state.grocery[w]||={};state.grocery[w][key]=checked;saveData();}
function printGrocery(){window.print();}
