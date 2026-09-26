const STORAGE_KEY = "forgeAftDataV1";

const defaultData = {
  measurements: {},
  completed: {},
  workoutData: {},
  aftTests: [],
  recoveryMode: false
};

let state = loadData();
let currentView = "home";
let selectedWeek = 1;
let selectedDay = null;

/* ------------------------------
   EXERCISE LIBRARY
------------------------------ */

const EX = {
  trxSquat: {
    name: "TRX Squat",
    how: "Face the anchor. Hold the handles with light tension. Sit your hips down and back while keeping your chest tall, then drive through the whole foot to stand.",
    cues: [
      "Keep knees tracking in the same direction as your toes.",
      "Use the straps for balance, not to pull yourself up.",
      "Keep your ribs stacked over your pelvis.",
      "Progress by using less assistance or moving toward single-leg variations."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Squat+official+exercise"
  },

  trxChest: {
    name: "TRX Chest Press",
    how: "Face away from the anchor with arms extended. Keep your body straight from head to heel. Bend your elbows and lower your chest between the handles, then press away.",
    cues: [
      "Brace your abs before every repetition.",
      "Do not allow your hips to sag.",
      "Keep shoulders away from your ears.",
      "Walk your feet farther back to make it easier and farther toward the anchor to make it harder."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Chest+Press+official+exercise"
  },

  trxRow: {
    name: "TRX Row",
    how: "Face the anchor and lean back with straight arms. Keep your body rigid. Pull your chest toward the handles by driving your elbows behind you, then lower under control.",
    cues: [
      "Do not shrug.",
      "Keep hips extended instead of folding at the waist.",
      "Pause briefly with the shoulder blades squeezed together.",
      "Move your feet toward the anchor to increase difficulty."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Row+official+exercise"
  },

  reverseLunge: {
    name: "TRX Reverse Lunge",
    how: "Face the anchor. Step one leg backward and lower the rear knee toward the floor. Keep most of your pressure through the front foot, then drive through the front leg to stand.",
    cues: [
      "Use the straps only for balance.",
      "Keep the front heel planted.",
      "Control the lowering portion.",
      "Keep the front knee tracking over the foot."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Reverse+Lunge+exercise"
  },

  splitSquat: {
    name: "TRX Split Squat",
    how: "Stand in a staggered stance while lightly holding the TRX. Lower straight down until the front thigh approaches parallel, then drive through the front leg.",
    cues: [
      "Keep most of the load on the front leg.",
      "Maintain a tall torso.",
      "Lower slowly.",
      "Use progressively less help from your arms."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Split+Squat+exercise"
  },

  singleSquat: {
    name: "TRX Assisted Single-Leg Squat",
    how: "Face the anchor and balance on one leg. Sit the hips back and lower under control while using only enough strap assistance to maintain position. Drive through the working leg to stand.",
    cues: [
      "Do not pull yourself up with your arms.",
      "Keep the working knee aligned with the toes.",
      "Use a comfortable depth.",
      "Reduce TRX assistance as you improve."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+single+leg+squat+exercise"
  },

  hamCurl: {
    name: "TRX Hamstring Curl",
    how: "Lie on your back with your heels in the foot cradles. Lift your hips, then pull your heels toward your glutes. Extend your legs slowly without letting your hips collapse.",
    cues: [
      "Keep the hips elevated.",
      "Control the return.",
      "Brace your abdomen.",
      "Shorten the range if your hips begin to drop."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Hamstring+Curl+official"
  },

  hipPress: {
    name: "TRX Hip Press",
    how: "Lie on your back with heels in the foot cradles and knees bent. Brace your core and drive your hips upward by squeezing your glutes.",
    cues: [
      "Finish with the glutes rather than arching the lower back.",
      "Keep ribs down.",
      "Pause briefly at the top."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Hip+Press+exercise"
  },

  bstanceRDL: {
    name: "15-lb KB B-Stance RDL",
    how: "Place one foot slightly behind the other as a kickstand. Keep roughly 80–90% of your weight on the front leg. Push the hips backward while lowering the kettlebell, then squeeze the front glute to stand.",
    cues: [
      "This is a hip hinge, not a squat.",
      "Keep your spine neutral.",
      "Feel tension in the front-leg hamstring.",
      "Use a three-second lowering phase to make 15 lb more challenging."
    ],
    video: "https://www.youtube.com/results?search_query=kettlebell+B+stance+Romanian+deadlift+form"
  },

  singleRDL: {
    name: "15-lb KB Single-Leg RDL",
    how: "Stand on one leg with a slight knee bend. Push your hips backward as the opposite leg extends behind you. Lower the kettlebell under control, then squeeze the standing-leg glute to return.",
    cues: [
      "Keep the hips relatively square to the floor.",
      "Use the TRX lightly for balance if necessary.",
      "Move through the hip rather than rounding your back.",
      "Use a slow three-second lowering phase."
    ],
    video: "https://www.youtube.com/results?search_query=kettlebell+single+leg+RDL+proper+form"
  },

  swing: {
    name: "15-lb Kettlebell Swing",
    how: "Hinge at the hips and hike the kettlebell behind you. Drive the floor away and snap the hips forward. Allow the kettlebell to float; guide it back into the next hinge.",
    cues: [
      "The power comes from the hips—not the arms.",
      "Keep your spine neutral.",
      "Keep your feet planted.",
      "Finish tall with glutes and abs tight.",
      "Do not turn the movement into a squat or front raise."
    ],
    video: "https://www.youtube.com/watch?v=yHxcTn1UeAc"
  },

  sprinter: {
    name: "TRX Sprinter Start",
    how: "Face away from the anchor with the straps under your arms. Lean forward into the straps, step one leg back, then drive forward through the front leg.",
    cues: [
      "Maintain a straight line through your torso.",
      "Drive through the ball and heel of the working foot.",
      "Keep the movement powerful but controlled."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Sprinter+Start+exercise"
  },

  triceps: {
    name: "TRX Triceps Press",
    how: "Face away from the anchor with arms extended in front of you. Bend only at the elbows and bring your forehead toward your hands, then straighten your arms.",
    cues: [
      "Keep elbows pointed forward.",
      "Brace your abdomen.",
      "Keep the upper arms relatively still."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Triceps+Press+official"
  },

  biceps: {
    name: "TRX Biceps Curl",
    how: "Face the anchor with palms toward your face. Keep your upper arms high while bending your elbows and bringing your hands toward your forehead.",
    cues: [
      "Do not let the elbows drop.",
      "Keep your body rigid.",
      "Lower slowly."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Biceps+Curl+official"
  },

  yfly: {
    name: "TRX Y-Fly",
    how: "Face the anchor and lean back. With straight arms, raise the arms overhead into a Y while bringing your body toward upright.",
    cues: [
      "Use a conservative body angle.",
      "Do not shrug.",
      "Move slowly and control the return.",
      "Stop if the movement causes shoulder pain."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Y+Fly+exercise"
  },

  plank: {
    name: "Plank",
    how: "Support yourself on your forearms and toes. Create a straight line from head through heels and maintain full-body tension.",
    cues: [
      "Squeeze glutes.",
      "Brace as though preparing for a punch.",
      "Do not allow the hips to sag.",
      "Breathe while maintaining tension."
    ],
    video: "https://www.youtube.com/results?search_query=proper+forearm+plank+form"
  },

  trxPlank: {
    name: "TRX Plank",
    how: "Place your feet in the TRX foot cradles and support yourself on your forearms or hands. Hold a rigid plank position.",
    cues: [
      "Master a floor plank first.",
      "Keep hips level.",
      "Brace your abdomen and glutes.",
      "Avoid excessive lower-back arch."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Plank+official"
  },

  fallout: {
    name: "TRX Fallout",
    how: "Face away from the anchor with arms extended. Slowly allow your arms to travel forward while maintaining a rigid torso, then use your core and lats to return.",
    cues: [
      "Do not let the lower back arch.",
      "Use a short range initially.",
      "Keep ribs down."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Fallout+exercise"
  },

  mountain: {
    name: "TRX Mountain Climber",
    how: "Place your feet in the cradles and assume a strong push-up position. Alternate driving each knee toward your chest.",
    cues: [
      "Keep shoulders stacked over hands.",
      "Keep hips controlled.",
      "Prioritize position over speed."
    ],
    video: "https://www.youtube.com/results?search_query=TRX+Mountain+Climber+exercise"
  },

  pushup: {
    name: "Hand-Release Push-Up Practice",
    how: "Lower your chest and thighs to the ground. Briefly lift your hands from the floor, replace them, and press your body upward as one unit.",
    cues: [
      "Keep your body rigid.",
      "Do not allow the hips to rise before the chest.",
      "Use a comfortable range and stop for shoulder pain.",
      "Quality repetitions matter more than rushing."
    ],
    video: "https://www.youtube.com/results?search_query=Army+hand+release+push+up+proper+form"
  }
};

/* ------------------------------
   12-WEEK PROGRAM
------------------------------ */

function phaseForWeek(w) {
  if (w <= 4) return "FOUNDATION";
  if (w <= 8) return "BUILD";
  return "PERFORMANCE";
}

function strengthPrescription(week) {
  if (week <= 2) return { sets: 3, reps: "10–12", rest: "75–90 sec" };
  if (week <= 4) return { sets: 3, reps: "12–15", rest: "60–90 sec" };
  if (week <= 6) return { sets: 4, reps: "8–12", rest: "75–90 sec" };
  if (week <= 8) return { sets: 4, reps: "10–15", rest: "60–90 sec" };
  return { sets: 4, reps: "8–15", rest: "60–90 sec" };
}

function exercise(id, sets, reps, rest, note = "") {
  return { id, sets, reps, rest, note };
}

const YOGA_BY_DAY = {
  Tuesday: {
    time: "EVENING • 8:00 PM",
    title: "Runner's Yoga",
    duration: "30 minutes",
    focus: "Leg and hip mobility after your run",
    url: "https://www.youtube.com/watch?v=0hTllAb4XGg"
  },
  Thursday: {
    time: "EVENING • 7:00 PM",
    title: "Yoga for Hips & Lower Back",
    duration: "23 minutes",
    focus: "Gentle hip and lower-back mobility",
    url: "https://www.youtube.com/watch?v=Ho9em79_0qg"
  },
  Saturday: {
    time: "EVENING • 8:00 PM",
    title: "Bedtime Yoga",
    duration: "20 minutes",
    focus: "Gentle full-body stretching after your aerobic day",
    url: "https://www.youtube.com/watch?v=v7SN-d4qXx0"
  }
};

function getWeekPlan(week) {
  const p = strengthPrescription(week);

  const harderLeg =
    week <= 4 ? "reverseLunge" :
    week <= 8 ? "splitSquat" :
    "singleSquat";

  const hinge =
    week <= 4 ? "bstanceRDL" :
    "singleRDL";

  const plankTime =
    week <= 2 ? "30 sec" :
    week <= 4 ? "40 sec" :
    week <= 6 ? "50 sec" :
    week <= 8 ? "60 sec" :
    "60–75 sec";

  const swingSets =
    week <= 2 ? 3 :
    week <= 6 ? 4 :
    5;

  const swingReps =
    week <= 4 ? "12–15" :
    "15–20";

  const runPlan = [
    "30 sec run / 2:30 walk × 8",
    "1:00 run / 2:00 walk × 8",
    "1:30 run / 2:00 walk × 7",
    "2:00 run / 2:00 walk × 7",
    "3:00 run / 1:30 walk × 6",
    "4:00 run / 1:30 walk × 5",
    "5:00 run / 1:30 walk × 4",
    "8:00 run / 2:00 walk × 3",
    "10:00 run / 2:00 walk / 10:00 run",
    "20–25 min continuous easy run",
    "25–30 min continuous easy run",
    "30 min continuous easy run"
  ][week - 1];

  const longCardio = [
    "30 min easy walk",
    "35 min easy walk",
    "35–40 min brisk walk",
    "40 min brisk walk",
    "40 min easy walk/run",
    "45 min easy walk/run",
    "45 min easy aerobic",
    "45–50 min easy aerobic",
    "35–45 min easy run/walk",
    "40 min easy run",
    "45 min easy run",
    "30–40 min easy recovery run"
  ][week - 1];

  return {
    Monday: {
      title: "Strength A",
      subtitle: "Push • Legs • Core",
      type: "strength",
      exercises: [
        exercise("trxSquat", p.sets, p.reps, p.rest),
        exercise("trxChest", p.sets, p.reps, p.rest),
        exercise("trxRow", p.sets, p.reps, p.rest),
        exercise(harderLeg, 3, "8–12 / leg", "75 sec"),
        exercise("triceps", 3, "10–15", "60 sec"),
        exercise("plank", 3, plankTime, "60 sec")
      ]
    },

    Tuesday: {
      title: "Run + AFT Core",
      subtitle: runPlan,
      type: "cardio",
      cardio: runPlan,
      exercises: [
        exercise("pushup", 3,
          week <= 4 ? "5–10" : "8–15",
          "60–90 sec"),
        exercise("fallout", 3, "8–12", "60 sec"),
        exercise("plank", 3, plankTime, "60 sec")
      ]
    },

    Wednesday: {
      title: "Strength B",
      subtitle: "Pull • Posterior Chain",
      type: "strength",
      exercises: [
        exercise("trxRow", p.sets, p.reps, p.rest),
        exercise(hinge, 4, "10–15 / leg", "75 sec",
          "Use a slow 3-second lowering phase."),
        exercise("hamCurl", 3, "10–15", "75 sec"),
        exercise("hipPress", 3, "12–15", "60 sec"),
        exercise("yfly", 3, "8–12", "60 sec"),
        exercise("trxPlank", 3, plankTime, "60 sec")
      ]
    },

    Thursday: {
      title: "Recovery + Mobility",
      subtitle: "20–30 min easy yoga / mobility",
      type: "recovery",
      cardio: "20–30 min mobility or gentle yoga",
      exercises: []
    },

    Friday: {
      title: "Full Body + Power",
      subtitle: "TRX • KB • Conditioning",
      type: "strength",
      exercises: [
        exercise("swing", swingSets, swingReps, "60–90 sec"),
        exercise("sprinter", 3, "10 / leg", "60 sec"),
        exercise("trxChest", 3, "10–15", "60 sec"),
        exercise("trxRow", 3, "10–15", "60 sec"),
        exercise(harderLeg, 3, "8–12 / leg", "60 sec"),
        exercise("mountain", 3, "20 total", "60 sec")
      ]
    },

    Saturday: {
      title: "Aerobic Base",
      subtitle: longCardio,
      type: "cardio",
      cardio: longCardio,
      exercises: []
    },

    Sunday: {
      title: "Rest",
      subtitle: "Full recovery",
      type: "rest",
      exercises: []
    }
  };
}

/* ------------------------------
   STORAGE
------------------------------ */

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultData, ...(saved || {}) };
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function workoutKey(week, day) {
  return `w${week}-${day}`;
}

function completedKey(week, day, index) {
  return `${workoutKey(week, day)}-${index}`;
}

/* ------------------------------
   NAVIGATION
------------------------------ */

const app = document.getElementById("app");

function navigate(view) {
  currentView = view;
  closeDrawer();

  if (view === "home") renderHome();
  if (view === "weeks") renderWeeks();
  if (view === "progress") renderProgress();
  if (view === "aft") renderAFT();
  if (view === "backup") renderBackup();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  const total = totalCompletion();

  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">12-WEEK AFT REBUILD</div>
      <h1>Build the base.<br>Earn the result.</h1>
      <p>
        TRX • 15-lb kettlebell • running • mobility
      </p>
    </section>

    <section class="card">
      <div class="eyebrow">PROGRAM STATUS</div>

      <div class="stat-grid">
        <div class="stat">
          <span class="stat-label">Complete</span>
          <span class="stat-value">${total}%</span>
        </div>

        <div class="stat">
          <span class="stat-label">Equipment</span>
          <span class="stat-value">TRX</span>
        </div>

        <div class="stat">
          <span class="stat-label">Weeks</span>
          <span class="stat-value">12</span>
        </div>

        <div class="stat">
          <span class="stat-label">Goal</span>
          <span class="stat-value">AFT</span>
        </div>
      </div>

      <div class="progress-track">
        <div class="progress-fill" style="width:${total}%"></div>
      </div>

      <button class="primary" onclick="openWeek(1)">
        Open Training Plan
      </button>
    </section>

    <section class="card">
      <div class="eyebrow">TRAINING RULE</div>
      <h2>Progress difficulty, not junk reps.</h2>

      <p>
        When you can complete the top of the prescribed rep range
        with clean form and roughly 2–3 good reps still available,
        make the TRX angle or exercise variation slightly harder.
      </p>

      <div class="callout">
        Your 15-lb kettlebell is useful for rebuilding the hip hinge,
        unilateral strength and power. It does not replace eventual
        heavy deadlift-specific training.
      </div>
    </section>

    <section class="card">
      <div class="eyebrow">RECOVERY MODE</div>
      <h2>Adjust without quitting.</h2>

      <p>
        Recovery Mode reduces strength-session volume by approximately
        one set per exercise. Use it when you need a lighter training day
        rather than forcing a hard session.
      </p>

      <button class="${state.recoveryMode ? "primary" : "secondary"}"
              onclick="toggleRecovery()">
        Recovery Mode:
        ${state.recoveryMode ? "ON" : "OFF"}
      </button>
    </section>

    <section class="card">
      <div class="eyebrow">SAFETY</div>

      <p>
        This plan is a progressive fitness template, not medical
        clearance. Stop training and seek appropriate evaluation for
        chest pain, fainting, severe or unusual shortness of breath,
        or other concerning symptoms.
      </p>
    </section>
  `;
}

function renderWeeks() {
  let html = `
    <section class="hero">
      <div class="eyebrow">TRAINING PLAN</div>
      <h1>12 Weeks</h1>
      <p>Select a week to open its training schedule.</p>
    </section>

    <div class="week-grid">
  `;

  for (let w = 1; w <= 12; w++) {
    const pct = weekCompletion(w);

    html += `
      <button class="week-button"
              onclick="openWeek(${w})">

        <span class="week-number">${w}</span>

        <span class="badge">${phaseForWeek(w)}</span>

        <div class="week-status">
          ${pct}% complete
        </div>

        <div class="progress-track">
          <div class="progress-fill"
               style="width:${pct}%"></div>
        </div>
      </button>
    `;
  }

  html += `</div>`;

  app.innerHTML = html;
}

function openWeek(week) {
  selectedWeek = week;
  const plan = getWeekPlan(week);

  let days = "";

  Object.entries(plan).forEach(([day, workout]) => {
    const status = dayStatus(week, day);

    days += `
      <button class="day-button"
              onclick="openDay('${day}')">

        <div class="day-info">
          <strong>${day}</strong>
          <span>${workout.title} • ${workout.subtitle}</span>
        </div>

        <span class="status-dot ${status}"></span>
      </button>
    `;
  });

  const m = state.measurements[week] || {};
  const previous = state.measurements[week - 1] || {};

  app.innerHTML = `
    <button class="back" onclick="navigate('weeks')">
      ← All Weeks
    </button>

    <section class="hero">
      <div class="eyebrow">${phaseForWeek(week)} PHASE</div>
      <h1>Week ${week}</h1>
    </section>

    <section class="card">
      <div class="eyebrow">WEEKLY CHECK-IN</div>
      <h2>Body Metrics</h2>

      <div class="measurement-row">

        <div class="field">
          <label>WEIGHT (LB)</label>

          <input type="number"
                 step="0.1"
                 value="${m.weight ?? ""}"
                 onchange="saveMeasurement(${week},'weight',this.value)">

          ${changeHTML(m.weight, previous.weight, "lb")}
        </div>

        <div class="field">
          <label>WAIST (IN)</label>

          <input type="number"
                 step="0.1"
                 value="${m.waist ?? ""}"
                 onchange="saveMeasurement(${week},'waist',this.value)">

          ${changeHTML(m.waist, previous.waist, "in")}
        </div>

      </div>

      <div class="progress-track">
        <div class="progress-fill"
             style="width:${weekCompletion(week)}%"></div>
      </div>

      <small>${weekCompletion(week)}% of scheduled training complete</small>
    </section>

    <div class="section-title">
      <div>
        <div class="eyebrow">SCHEDULE</div>
        <h2>Training Days</h2>
      </div>
    </div>

    ${days}
  `;
}

function openDay(day) {
  selectedDay = day;

  const workout = getWeekPlan(selectedWeek)[day];
  const wk = workoutKey(selectedWeek, day);

  const saved = state.workoutData[wk] || {};

  let exercises = "";

  workout.exercises.forEach((item, i) => {
    const e = EX[item.id];

    const checked =
      state.completed[completedKey(selectedWeek, day, i)]
        ? "checked"
        : "";

    const adjustedSets =
      state.recoveryMode && workout.type === "strength"
        ? Math.max(2, Number(item.sets) - 1)
        : item.sets;

    exercises += `
      <div class="exercise">

        <input class="exercise-check"
               type="checkbox"
               ${checked}
               onchange="toggleExercise(${selectedWeek},
                                        '${day}',
                                        ${i},
                                        this.checked)">

        <button class="exercise-button"
                onclick="showExercise('${item.id}')">

          <strong>${e.name}</strong>

          <span>
            ${item.note || "Tap for instructions & form cues"}
          </span>
        </button>

        <div class="exercise-prescription">
          ${adjustedSets} × ${item.reps}
          <br>
          <span style="color:var(--muted)">
            ${item.rest}
          </span>
        </div>
      </div>
    `;
  });

  app.innerHTML = `
    <button class="back"
            onclick="openWeek(${selectedWeek})">
      ← Week ${selectedWeek}
    </button>

    <section class="hero">
      <div class="eyebrow">
        WEEK ${selectedWeek} • ${day.toUpperCase()}
      </div>

      <h1>${workout.title}</h1>

      <p>${workout.subtitle}</p>
    </section>

    ${state.recoveryMode && workout.type === "strength"
      ? `
      <div class="callout warning">
        Recovery Mode is active. Strength volume has been reduced.
      </div>
      `
      : ""
    }

    ${workout.cardio
      ? `
      <section class="card">
        <div class="eyebrow">SESSION TARGET</div>
        <h2>${workout.cardio}</h2>
      </section>
      `
      : ""
    }

    ${workout.exercises.length
      ? `
      <section class="card">
        <div class="eyebrow">WORKOUT</div>
        ${exercises}
      </section>
      `
      : `
      <section class="card">
        <div class="eyebrow">
          ${workout.type === "rest" ? "RECOVERY" : "SESSION"}
        </div>

        <h2>${workout.subtitle}</h2>

        <p>
          ${workout.type === "rest"
            ? "No required training today. Easy walking or gentle mobility is optional."
            : "Keep this session comfortable. The purpose is recovery and movement quality."
          }
        </p>
      </section>
      `
    }

    ${YOGA_BY_DAY[day]
      ? `
      <section class="card">
        <div class="eyebrow">YOGA • ${YOGA_BY_DAY[day].time}</div>
        <h2>${YOGA_BY_DAY[day].title}</h2>
        <p>${YOGA_BY_DAY[day].duration} • ${YOGA_BY_DAY[day].focus}</p>
        <a class="primary"
           href="${YOGA_BY_DAY[day].url}"
           target="_blank"
           rel="noopener noreferrer"
           style="display:block; text-align:center; text-decoration:none; margin-top:14px;">
          ▶ Watch yoga video
        </a>
      </section>
      `
      : ""
    }

    <section class="card">
      <div class="eyebrow">SESSION LOG</div>

      <div class="field">
        <label>RPE — HOW HARD DID THIS FEEL? (1–10)</label>

        <input type="number"
               min="1"
               max="10"
               value="${saved.rpe ?? ""}"
               onchange="saveWorkoutField('${wk}','rpe',this.value)">
      </div>

      <div class="measurement-row">

        <div class="field">
          <label>CARDIO MINUTES</label>

          <input type="number"
                 value="${saved.minutes ?? ""}"
                 onchange="saveWorkoutField('${wk}','minutes',this.value)">
        </div>

        <div class="field">
          <label>DISTANCE (MILES)</label>

          <input type="number"
                 step="0.01"
                 value="${saved.distance ?? ""}"
                 onchange="saveWorkoutField('${wk}','distance',this.value)">
        </div>

      </div>

      <div class="field">
        <label>AVERAGE HR — OPTIONAL</label>

        <input type="number"
               value="${saved.hr ?? ""}"
               onchange="saveWorkoutField('${wk}','hr',this.value)">
      </div>

      <div class="field">
        <label>NOTES</label>

        <textarea
          onchange="saveWorkoutField('${wk}','notes',this.value)"
          placeholder="Energy, breathing, pain, what felt easy/hard...">${saved.notes ?? ""}</textarea>
      </div>

      <button class="primary"
              onclick="markDayComplete(${selectedWeek},'${day}')">
        Mark Day Complete
      </button>
    </section>
  `;
}

/* ------------------------------
   EXERCISE MODAL
------------------------------ */

function showExercise(id) {
  const e = EX[id];

  document.getElementById("modalContent").innerHTML = `
    <div class="exercise-detail">
      <div class="eyebrow">EXERCISE GUIDE</div>

      <h2>${e.name}</h2>

      <p>${e.how}</p>

      <h3>Key Pointers</h3>

      <ul class="cue-list">
        ${e.cues.map(c => `<li>${c}</li>`).join("")}
      </ul>

      <a href="${e.video}"
         target="_blank"
         rel="noopener">

        <button class="primary">
          ▶ Watch Demonstration
        </button>
      </a>
    </div>
  `;

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* ------------------------------
   COMPLETION
------------------------------ */

function toggleExercise(week, day, index, checked) {
  state.completed[completedKey(week, day, index)] = checked;
  saveData();
}

function markDayComplete(week, day) {
  const workout = getWeekPlan(week)[day];

  if (workout.exercises.length) {
    workout.exercises.forEach((_, i) => {
      state.completed[completedKey(week, day, i)] = true;
    });
  }

  state.completed[`${workoutKey(week, day)}-DAY`] = true;

  saveData();
  openDay(day);
}

function dayStatus(week, day) {
  const workout = getWeekPlan(week)[day];

  if (state.completed[`${workoutKey(week, day)}-DAY`]) {
    return "complete";
  }

  if (!workout.exercises.length) return "";

  const done = workout.exercises.filter((_, i) =>
    state.completed[completedKey(week, day, i)]
  ).length;

  if (done === workout.exercises.length) return "complete";
  if (done > 0) return "partial";

  return "";
}

function weekCompletion(week) {
  const plan = getWeekPlan(week);

  const trainingDays =
    Object.keys(plan).filter(day => day !== "Sunday");

  const complete =
    trainingDays.filter(day =>
      dayStatus(week, day) === "complete"
    ).length;

  return Math.round((complete / trainingDays.length) * 100);
}

function totalCompletion() {
  let total = 0;

  for (let w = 1; w <= 12; w++) {
    total += weekCompletion(w);
  }

  return Math.round(total / 12);
}

/* ------------------------------
   MEASUREMENTS
------------------------------ */

function saveMeasurement(week, field, value) {
  state.measurements[week] ||= {};

  state.measurements[week][field] =
    value === "" ? null : Number(value);

  saveData();
  openWeek(week);
}

function changeHTML(current, previous, unit) {
  if (
    current === undefined ||
    current === null ||
    previous === undefined ||
    previous === null
  ) {
    return `<div class="change neutral">No prior comparison</div>`;
  }

  const diff = Number((current - previous).toFixed(1));

  if (diff === 0) {
    return `<div class="change neutral">±0 ${unit}</div>`;
  }

  const sign = diff > 0 ? "+" : "";

  const cls =
    diff < 0 ? "positive" : "negative";

  return `
    <div class="change ${cls}">
      ${sign}${diff} ${unit} vs last week
    </div>
  `;
}

/* ------------------------------
   WORKOUT LOG
------------------------------ */

function saveWorkoutField(key, field, value) {
  state.workoutData[key] ||= {};
  state.workoutData[key][field] = value;
  saveData();
}

/* ------------------------------
   PROGRESS
------------------------------ */

function renderProgress() {
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">PROGRESS</div>
      <h1>Trend, not noise.</h1>

      <p>
        Weekly measurements are compared under consistent conditions.
      </p>
    </section>

    <section class="card">
      <div class="eyebrow">BODY WEIGHT</div>
      <h2>12-Week Trend</h2>

      <div class="chart-wrap">
        <canvas id="weightChart"></canvas>
      </div>
    </section>

    <section class="card">
      <div class="eyebrow">WAIST</div>
      <h2>12-Week Trend</h2>

      <div class="chart-wrap">
        <canvas id="waistChart"></canvas>
      </div>
    </section>

    <section class="card">
      <div class="eyebrow">CONSISTENCY</div>
      <h2>${totalCompletion()}% Complete</h2>

      <div class="progress-track">
        <div class="progress-fill"
             style="width:${totalCompletion()}%"></div>
      </div>
    </section>
  `;

  setTimeout(() => {
    drawChart("weightChart", "weight");
    drawChart("waistChart", "waist");
  }, 20);
}

function drawChart(canvasId, field) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = 210 * dpr;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = 210;

  const values = [];

  for (let w = 1; w <= 12; w++) {
    const v = state.measurements[w]?.[field];

    if (v !== undefined && v !== null) {
      values.push({ week: w, value: Number(v) });
    }
  }

  ctx.clearRect(0,0,width,height);

  ctx.font = "11px -apple-system";
  ctx.fillStyle = "#929da8";

  if (values.length < 2) {
    ctx.fillText(
      "Enter at least two weekly measurements to show a trend.",
      10,
      30
    );
    return;
  }

  const min = Math.min(...values.map(v => v.value));
  const max = Math.max(...values.map(v => v.value));
  const range = max - min || 1;

  const left = 25;
  const right = width - 15;
  const top = 20;
  const bottom = height - 30;

  ctx.strokeStyle = "#c6a15b";
  ctx.lineWidth = 3;

  ctx.beginPath();

  values.forEach((point, i) => {
    const x =
      left + ((point.week - 1) / 11) * (right - left);

    const y =
      bottom -
      ((point.value - min) / range) *
      (bottom - top);

    if (i === 0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  });

  ctx.stroke();

  values.forEach(point => {
    const x =
      left + ((point.week - 1) / 11) * (right - left);

    const y =
      bottom -
      ((point.value - min) / range) *
      (bottom - top);

    ctx.fillStyle = "#c6a15b";

    ctx.beginPath();
    ctx.arc(x,y,4,0,Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#929da8";
    ctx.fillText(`W${point.week}`, x - 8, height - 8);
  });
}

/* ------------------------------
   AFT TRACKER
------------------------------ */

function renderAFT() {
  const rows = state.aftTests
    .map((t,i) => `
      <div class="card compact">
        <strong>${t.date || "Test"}</strong>

        <p>
          DL: ${t.deadlift || "—"} lb •
          HRP: ${t.hrp || "—"} •
          SDC: ${t.sdc || "—"} •
          Plank: ${t.plank || "—"} •
          2-Mile: ${t.run || "—"}
        </p>

        <button class="danger"
                onclick="deleteAFT(${i})">
          Delete
        </button>
      </div>
    `)
    .join("");

  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">AFT TRACKER</div>
      <h1>Test the result.</h1>

      <p>
        Record occasional AFT-event performance separately from
        everyday training.
      </p>
    </section>

    <section class="card">

      <div class="field">
        <label>DATE</label>
        <input id="aftDate" type="date">
      </div>

      <div class="measurement-row">

        <div class="field">
          <label>3RM DEADLIFT (LB)</label>
          <input id="aftDL" type="number">
        </div>

        <div class="field">
          <label>HAND-RELEASE PUSH-UPS</label>
          <input id="aftHRP" type="number">
        </div>

      </div>

      <div class="measurement-row">

        <div class="field">
          <label>SPRINT-DRAG-CARRY</label>
          <input id="aftSDC" placeholder="1:55">
        </div>

        <div class="field">
          <label>PLANK</label>
          <input id="aftPlank" placeholder="2:30">
        </div>

      </div>

      <div class="field">
        <label>2-MILE RUN</label>
        <input id="aftRun" placeholder="18:30">
      </div>

      <button class="primary" onclick="addAFT()">
        Save Test
      </button>
    </section>

    <div class="section-title">
      <div>
        <div class="eyebrow">HISTORY</div>
        <h2>Previous Tests</h2>
      </div>
    </div>

    ${rows || `<p>No tests recorded yet.</p>`}
  `;
}

function addAFT() {
  state.aftTests.unshift({
    date: document.getElementById("aftDate").value,
    deadlift: document.getElementById("aftDL").value,
    hrp: document.getElementById("aftHRP").value,
    sdc: document.getElementById("aftSDC").value,
    plank: document.getElementById("aftPlank").value,
    run: document.getElementById("aftRun").value
  });

  saveData();
  renderAFT();
}

function deleteAFT(index) {
  if (!confirm("Delete this AFT test?")) return;

  state.aftTests.splice(index,1);
  saveData();
  renderAFT();
}

/* ------------------------------
   RECOVERY MODE
------------------------------ */

function toggleRecovery() {
  state.recoveryMode = !state.recoveryMode;
  saveData();
  renderHome();
}

/* ------------------------------
   BACKUP / RESTORE
------------------------------ */

function renderBackup() {
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">DATA</div>
      <h1>Protect your progress.</h1>
    </section>

    <section class="card">
      <h2>Export Backup</h2>

      <p>
        Downloads a copy of your measurements, workout history,
        completion status and AFT tests.
      </p>

      <button class="primary" onclick="exportData()">
        Export Backup
      </button>
    </section>

    <section class="card">
      <h2>Import Backup</h2>

      <p>
        Restore previously exported FORGE data.
      </p>

      <input type="file"
             id="importFile"
             accept=".json">

      <button class="secondary"
              style="margin-top:10px"
              onclick="importData()">
        Import Backup
      </button>
    </section>

    <section class="card">
      <h2>Reset Program</h2>

      <p>
        This permanently clears the data saved by FORGE on this device.
      </p>

      <button class="danger"
              onclick="resetData()">
        Reset All Data
      </button>
    </section>
  `;
}

function exportData() {
  const blob = new Blob(
    [JSON.stringify(state,null,2)],
    { type:"application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `FORGE-backup-${new Date()
    .toISOString()
    .slice(0,10)}.json`;

  a.click();

  URL.revokeObjectURL(url);
}

function importData() {
  const file =
    document.getElementById("importFile").files[0];

  if (!file) {
    alert("Choose a FORGE backup file first.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);

      state = {
        ...defaultData,
        ...parsed
      };

      saveData();

      alert("Backup restored.");
      renderHome();

    } catch {
      alert("That file could not be read as a FORGE backup.");
    }
  };

  reader.readAsText(file);
}

function resetData() {
  if (!confirm(
    "This will erase all FORGE data on this device. Continue?"
  )) return;

  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(defaultData);

  renderHome();
}

/* ------------------------------
   TIMER
------------------------------ */

let timerSeconds = 60;
let timerOriginal = 60;
let timerInterval = null;

function updateTimerDisplay() {
  const min =
    String(Math.floor(timerSeconds / 60))
      .padStart(2,"0");

  const sec =
    String(timerSeconds % 60)
      .padStart(2,"0");

  document.getElementById("timerDisplay")
    .textContent = `${min}:${sec}`;
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {

    timerSeconds--;

    if (timerSeconds <= 0) {
      timerSeconds = 0;

      clearInterval(timerInterval);
      timerInterval = null;

      if ("vibrate" in navigator) {
        navigator.vibrate([200,100,200]);
      }
    }

    updateTimerDisplay();

  },1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  timerSeconds = timerOriginal;

  updateTimerDisplay();
}

/* ------------------------------
   DRAWER
------------------------------ */

function openDrawer() {
  document.getElementById("drawer").classList.add("open");
  document.getElementById("drawerOverlay").classList.add("open");
}

function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("drawerOverlay").classList.remove("open");
}

/* ------------------------------
   EVENTS
------------------------------ */

document.getElementById("menuBtn")
  .addEventListener("click",openDrawer);

document.getElementById("closeMenu")
  .addEventListener("click",closeDrawer);

document.getElementById("drawerOverlay")
  .addEventListener("click",closeDrawer);

document.querySelectorAll("[data-view]")
  .forEach(btn => {
    btn.addEventListener("click",() =>
      navigate(btn.dataset.view)
    );
  });

document.querySelectorAll("[data-close-modal]")
  .forEach(el =>
    el.addEventListener("click",closeModal)
  );

document.getElementById("timerBtn")
  .addEventListener("click",() => {
    document.getElementById("timerPanel")
      .classList.remove("hidden");
  });

document.getElementById("closeTimer")
  .addEventListener("click",() => {
    document.getElementById("timerPanel")
      .classList.add("hidden");
  });

document.querySelectorAll("[data-seconds]")
  .forEach(btn => {
    btn.addEventListener("click",() => {
      timerSeconds = Number(btn.dataset.seconds);
      timerOriginal = timerSeconds;
      resetTimer();
    });
  });

document.getElementById("timerStart")
  .addEventListener("click",startTimer);

document.getElementById("timerReset")
  .addEventListener("click",resetTimer);

/* ------------------------------
   SERVICE WORKER
------------------------------ */

if ("serviceWorker" in navigator) {
  window.addEventListener("load",() => {
    navigator.serviceWorker.register("./sw.js");
  });
}

/* ------------------------------
   START
------------------------------ */

renderHome();
