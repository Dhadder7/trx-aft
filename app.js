const STORAGE_KEY = "forgeAftDataV1";

const defaultData = {
  measurements: {},
  completed: {},
  workoutData: {},
  aftTests: [],
  recoveryMode: false,
  skincareCompleted: {}
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
   SKIN CARE
------------------------------ */

const SKINCARE = {
  morning: [
    {
      id: "cleanse-am",
      name: "Gentle Facial Cleanser",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=240&q=80",
      how: "Wet your face with lukewarm water. Massage a small amount of gentle cleanser over the face for about 20–30 seconds, then rinse and gently pat dry. Do not scrub.",
      video: "https://www.youtube.com/results?search_query=dermatologist+how+to+wash+face+gentle+cleanser"
    },
    {
      id: "vitamin-c",
      name: "Timeless 20% Vitamin C + E Ferulic Acid Serum",
      image: "https://www.timelessha.com/cdn/shop/files/20_Vitamin_C_E_Ferulic_Acid_Serum_1oz.jpg?v=1741369927&width=360",
      how: "Apply a thin, even layer to clean, dry skin. Spread gently across the face rather than concentrating it beneath the eyes. Keep it off the eyelids and stop using it on any area that stings or becomes irritated.",
      video: "https://www.youtube.com/results?search_query=Timeless+20%25+Vitamin+C+E+Ferulic+how+to+apply"
    },
    {
      id: "caffeine-am",
      name: "The Ordinary Caffeine Solution 5% + EGCG",
      image: "https://theordinary.com/on/demandware.static/-/Sites-deciem-master-catalog/default/dw58dd7509/Images/products/The%20Ordinary/rdn-caffeine-solution-5pct-egcg-30ml.png",
      how: "Optional for temporary help with the appearance of puffiness. Use one small drop for each eye and gently tap along the orbital bone with a fingertip. Do not rub outward repeatedly or apply directly into the eyes.",
      video: "https://www.youtube.com/results?search_query=The+Ordinary+Caffeine+Solution+5%25+EGCG+how+to+apply"
    },
    {
      id: "moisturizer-am",
      name: "La Roche-Posay Toleriane Double Repair Face Moisturizer",
      image: "https://www.laroche-posay.us/dw/image/v2/AAFM_PRD/on/demandware.static/-/Sites-lrp-master-catalog/default/dw772c5531/img/3337875545792_Toleriane_Double_Repair_Face_Moisturizer_75ml.jpg",
      how: "Apply a thin, even layer over the face and neck. Be gentle around the eye area. Moisturizer helps support the skin barrier and can reduce the dry look that makes fine lines more noticeable.",
      video: "https://www.youtube.com/results?search_query=La+Roche+Posay+Toleriane+Double+Repair+how+to+apply"
    },
    {
      id: "sunscreen-am",
      name: "Broad-Spectrum Sunscreen SPF 30–50+",
      image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=240&q=80",
      how: "Finish every morning with broad-spectrum SPF 30 or higher over the entire face, ears and exposed neck. Apply it evenly rather than protecting only the eye area. Reapply when outdoors for extended periods, especially after sweating.",
      video: "https://www.youtube.com/results?search_query=American+Academy+Dermatology+how+to+apply+sunscreen+face"
    }
  ],

  nightRetinal: [
    {
      id: "cleanse-pm-r",
      name: "Gentle Facial Cleanser",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=240&q=80",
      how: "Wash with lukewarm water and a gentle cleanser. Pat dry rather than rubbing. If your skin is easily irritated, allow it to dry fully before the retinal step.",
      video: "https://www.youtube.com/results?search_query=dermatologist+how+to+wash+face+gentle+cleanser"
    },
    {
      id: "retinal-pm",
      name: "The Ordinary Retinal 0.2% Emulsion",
      image: "https://theordinary.com/on/demandware.static/-/Sites-deciem-master-catalog/default/dw7338b72f/Images/products/The%20Ordinary/rdn-retinal-02-emulsion-15ml.png",
      how: "Use a small amount for the whole face at night. Apply a thin layer and keep it away from the eyelids, corners of the nose and lips, and the immediate under-eye area for now. Do not combine this routine with your Granactive Retinoid. Reduce frequency if you develop persistent dryness, burning, peeling or redness.",
      video: "https://www.youtube.com/results?search_query=The+Ordinary+Retinal+0.2%25+Emulsion+how+to+use"
    },
    {
      id: "moisturizer-pm-r",
      name: "La Roche-Posay Toleriane Double Repair Face Moisturizer",
      image: "https://www.laroche-posay.us/dw/image/v2/AAFM_PRD/on/demandware.static/-/Sites-lrp-master-catalog/default/dw772c5531/img/3337875545792_Toleriane_Double_Repair_Face_Moisturizer_75ml.jpg",
      how: "Finish with moisturizer over the face and neck. If retinal is drying, you can also use moisturizer before retinal as a buffer, then add another light layer afterward.",
      video: "https://www.youtube.com/results?search_query=La+Roche+Posay+Toleriane+Double+Repair+how+to+apply"
    }
  ],

  nightRecovery: [
    {
      id: "cleanse-pm-rec",
      name: "Gentle Facial Cleanser",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=240&q=80",
      how: "Wash gently with lukewarm water, rinse thoroughly and pat dry. Avoid scrubbing or exfoliating the lighter-looking under-eye and upper-cheek area.",
      video: "https://www.youtube.com/results?search_query=dermatologist+how+to+wash+face+gentle+cleanser"
    },
    {
      id: "peptide-pm",
      name: "The Ordinary Multi-Peptide + HA Serum",
      image: "https://theordinary.com/on/demandware.static/-/Sites-deciem-master-catalog/default/dw2f9d80a8/Images/products/The%20Ordinary/rdn-multi-peptide-ha-serum-30ml.png",
      how: "Apply a few drops in a thin layer over the face. This is your gentler treatment night between retinal applications.",
      video: "https://www.youtube.com/results?search_query=The+Ordinary+Multi-Peptide+HA+Serum+how+to+use"
    },
    {
      id: "moisturizer-pm-rec",
      name: "La Roche-Posay Toleriane Double Repair Face Moisturizer",
      image: "https://www.laroche-posay.us/dw/image/v2/AAFM_PRD/on/demandware.static/-/Sites-lrp-master-catalog/default/dw772c5531/img/3337875545792_Toleriane_Double_Repair_Face_Moisturizer_75ml.jpg",
      how: "Apply evenly over the face and neck, including a light layer beneath the eyes if it does not sting. On recovery nights the priority is hydration and keeping the skin barrier comfortable.",
      video: "https://www.youtube.com/results?search_query=La+Roche+Posay+Toleriane+Double+Repair+how+to+apply"
    }
  ]
};

function skinDateKey() {
  return new Date().toISOString().slice(0, 10);
}

function skinCheckKey(routine, id) {
  return `${skinDateKey()}-${routine}-${id}`;
}

function toggleSkinStep(routine, id, checked) {
  state.skincareCompleted ||= {};
  state.skincareCompleted[skinCheckKey(routine, id)] = checked;
  saveData();
}

function skinRoutineHTML(title, subtitle, routine, items) {
  const rows = items.map(item => {
    const checked =
      state.skincareCompleted?.[skinCheckKey(routine, item.id)]
        ? "checked"
        : "";

    return `
      <div class="exercise" style="align-items:flex-start">
        <input
          class="exercise-check"
          type="checkbox"
          ${checked}
          onchange="toggleSkinStep('${routine}','${item.id}',this.checked)"
        >

        <img
          src="${item.image}"
          alt="${item.name}"
          loading="lazy"
          style="width:64px;height:64px;border-radius:12px;object-fit:contain;background:#fff;padding:4px;flex-shrink:0"
          onerror="this.style.display='none'"
        >

        <div style="flex:1;min-width:0">
          <strong style="display:block;margin-bottom:6px">
            ${item.name}
          </strong>

          <span style="display:block;color:var(--muted);line-height:1.45">
            ${item.how}
          </span>

          <a
            href="${item.video}"
            target="_blank"
            rel="noopener noreferrer"
            style="display:inline-block;margin-top:10px;text-decoration:none"
          >
            <button class="secondary" type="button">
              ▶ Video demonstration
            </button>
          </a>
        </div>
      </div>
    `;
  }).join("");

  return `
    <section class="card">
      <div class="eyebrow">${subtitle}</div>
      <h2>${title}</h2>
      ${rows}
    </section>
  `;
}

function renderSkincare() {
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">DAILY CARE</div>
      <h1>Skin Care</h1>
      <p>
        Simple, consistent care for tone, texture, hydration and healthy aging.
      </p>
    </section>

    <div class="callout">
      Because you noticed a lighter-looking strip beneath and outward from your eyes,
      avoid concentrating vitamin C, retinal or other brightening products there for now.
      Apply products gently and evenly rather than repeatedly rubbing outward.
    </div>

    ${skinRoutineHTML(
      "Morning Routine",
      "AM • EVERY DAY",
      "morning",
      SKINCARE.morning
    )}

    ${skinRoutineHTML(
      "Retinal Night",
      "PM • TREATMENT NIGHT",
      "nightRetinal",
      SKINCARE.nightRetinal
    )}

    ${skinRoutineHTML(
      "Recovery / Peptide Night",
      "PM • BETWEEN RETINAL NIGHTS",
      "nightRecovery",
      SKINCARE.nightRecovery
    )}

    <section class="card">
      <div class="eyebrow">HOW TO ROTATE</div>
      <h2>Keep the routine gentle.</h2>

      <p>
        Use the morning routine daily. At night, alternate retinal nights with
        recovery/peptide nights based on how your skin tolerates retinal. If your
        skin becomes persistently red, painful, itchy, very dry, peeling or burning,
        stop the irritating active and use gentle cleanser, moisturizer and daytime
        sunscreen while your skin settles.
      </p>
    </section>
  `;
}
/* ------------------------------
   12-WEEK PROGRAM
------------------------------ */

function phaseForWeek(week) {
  if (week <= 4) return "FOUNDATION";
  if (week <= 8) return "BUILD";
  return "PERFORMANCE";
}

function strengthPrescription(week) {
  if (week <= 2) {
    return {
      sets: 3,
      reps: "10–12",
      rest: "75–90 sec"
    };
  }

  if (week <= 4) {
    return {
      sets: 3,
      reps: "12–15",
      rest: "60–90 sec"
    };
  }

  if (week <= 6) {
    return {
      sets: 4,
      reps: "8–12",
      rest: "75–90 sec"
    };
  }

  if (week <= 8) {
    return {
      sets: 4,
      reps: "10–15",
      rest: "60–90 sec"
    };
  }

  return {
    sets: 4,
    reps: "8–15",
    rest: "60–90 sec"
  };
}

function exercise(id, sets, reps, rest, note = "") {
  return {
    id,
    sets,
    reps,
    rest,
    note
  };
}

function getWeekPlan(week) {
  const p = strengthPrescription(week);

  const harderLeg =
    week <= 4
      ? "reverseLunge"
      : week <= 8
        ? "splitSquat"
        : "singleSquat";

  const hinge =
    week <= 4
      ? "bstanceRDL"
      : "singleRDL";

  const plankTime =
    week <= 2
      ? "30 sec"
      : week <= 4
        ? "40 sec"
        : week <= 6
          ? "50 sec"
          : week <= 8
            ? "60 sec"
            : "60–75 sec";

  const swingSets =
    week <= 2
      ? 3
      : week <= 6
        ? 4
        : 5;

  const swingReps =
    week <= 4
      ? "12–15"
      : "15–20";

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
        exercise(
          harderLeg,
          3,
          "8–12 / leg",
          "75 sec"
        ),
        exercise(
          "triceps",
          3,
          "10–15",
          "60 sec"
        ),
        exercise(
          "plank",
          3,
          plankTime,
          "60 sec"
        )
      ]
    },

    Tuesday: {
      title: "Run + AFT Core",
      subtitle: runPlan,
      type: "cardio",
      cardio: runPlan,
      exercises: [
        exercise(
          "pushup",
          3,
          week <= 4
            ? "5–10"
            : "8–15",
          "60–90 sec"
        ),
        exercise(
          "fallout",
          3,
          "8–12",
          "60 sec"
        ),
        exercise(
          "plank",
          3,
          plankTime,
          "60 sec"
        )
      ]
    },

    Wednesday: {
      title: "Strength B",
      subtitle: "Pull • Posterior Chain",
      type: "strength",
      exercises: [
        exercise(
          "trxRow",
          p.sets,
          p.reps,
          p.rest
        ),
        exercise(
          hinge,
          4,
          "10–15 / leg",
          "75 sec",
          "Use a slow 3-second lowering phase."
        ),
        exercise(
          "hamCurl",
          3,
          "10–15",
          "75 sec"
        ),
        exercise(
          "hipPress",
          3,
          "12–15",
          "60 sec"
        ),
        exercise(
          "yfly",
          3,
          "8–12",
          "60 sec"
        ),
        exercise(
          "trxPlank",
          3,
          plankTime,
          "60 sec"
        )
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
        exercise(
          "swing",
          swingSets,
          swingReps,
          "60–90 sec"
        ),
        exercise(
          "sprinter",
          3,
          "10 / leg",
          "60 sec"
        ),
        exercise(
          "trxChest",
          3,
          "10–15",
          "60 sec"
        ),
        exercise(
          "trxRow",
          3,
          "10–15",
          "60 sec"
        ),
        exercise(
          harderLeg,
          3,
          "8–12 / leg",
          "60 sec"
        ),
        exercise(
          "mountain",
          3,
          "20 total",
          "60 sec"
        )
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
    const saved =
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      );

    return {
      ...defaultData,
      ...(saved || {}),
      measurements:
        saved?.measurements || {},
      completed:
        saved?.completed || {},
      workoutData:
        saved?.workoutData || {},
      aftTests:
        Array.isArray(saved?.aftTests)
          ? saved.aftTests
          : [],
      skincareCompleted:
        saved?.skincareCompleted || {}
    };
  } catch {
    return {
      measurements: {},
      completed: {},
      workoutData: {},
      aftTests: [],
      recoveryMode: false,
      skincareCompleted: {}
    };
  }
}

function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}

function workoutKey(week, day) {
  return `w${week}-${day}`;
}

function completedKey(
  week,
  day,
  index
) {
  return `${workoutKey(week, day)}-${index}`;
}


/* ------------------------------
   APP + NAVIGATION
------------------------------ */

const app =
  document.getElementById("app");

function navigate(view) {
  currentView = view;
  closeDrawer();

  if (view === "home") {
    renderHome();
  }

  if (view === "weeks") {
    renderWeeks();
  }

  if (view === "progress") {
    renderProgress();
  }

  if (view === "aft") {
    renderAFT();
  }

  if (view === "nutrition") {
    if (
      typeof renderNutrition ===
      "function"
    ) {
      renderNutrition();
    }
  }

  if (view === "skincare") {
    renderSkincare();
  }

  if (view === "backup") {
    renderBackup();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ------------------------------
   HOME
------------------------------ */

function renderHome() {
  const total =
    totalCompletion();

  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">
        12-WEEK AFT REBUILD
      </div>

      <h1>
        Build the base.<br>
        Earn the result.
      </h1>

      <p>
        TRX • 15-lb kettlebell • running • mobility
      </p>
    </section>

    <section class="card">
      <div class="eyebrow">
        PROGRAM STATUS
      </div>

      <div class="stat-grid">
        <div class="stat">
          <span class="stat-label">
            Complete
          </span>

          <span class="stat-value">
            ${total}%
          </span>
        </div>

        <div class="stat">
          <span class="stat-label">
            Equipment
          </span>

          <span class="stat-value">
            TRX
          </span>
        </div>

        <div class="stat">
          <span class="stat-label">
            Weeks
          </span>

          <span class="stat-value">
            12
          </span>
        </div>

        <div class="stat">
          <span class="stat-label">
            Goal
          </span>

          <span class="stat-value">
            AFT
          </span>
        </div>
      </div>

      <div class="progress-track">
        <div
          class="progress-fill"
          style="width:${total}%"
        ></div>
      </div>

      <button
        class="primary"
        onclick="openWeek(1)"
      >
        Open Training Plan
      </button>
    </section>

    <section class="card">
      <div class="eyebrow">
        TRAINING RULE
      </div>

      <h2>
        Progress difficulty,
        not junk reps.
      </h2>

      <p>
        When you can complete the top of the
        prescribed rep range with clean form
        and roughly 2–3 good reps still available,
        make the TRX angle or exercise variation
        slightly harder.
      </p>

      <div class="callout">
        Your 15-lb kettlebell is useful for rebuilding
        the hip hinge, unilateral strength and power.
        It does not replace eventual heavy
        deadlift-specific training.
      </div>
    </section>

    <section class="card">
      <div class="eyebrow">
        RECOVERY MODE
      </div>

      <h2>
        Adjust without quitting.
      </h2>

      <p>
        Recovery Mode reduces strength-session
        volume by approximately one set per exercise.
        Use it when you need a lighter training day
        rather than forcing a hard session.
      </p>

      <button
        class="${
          state.recoveryMode
            ? "primary"
            : "secondary"
        }"
        onclick="toggleRecovery()"
      >
        Recovery Mode:
        ${
          state.recoveryMode
            ? "ON"
            : "OFF"
        }
      </button>
    </section>

    <section class="card">
      <div class="eyebrow">
        SKIN CARE
      </div>

      <h2>
        Keep the routine consistent.
      </h2>

      <p>
        Track your morning routine,
        retinal nights and recovery nights.
      </p>

      <button
        class="secondary"
        onclick="navigate('skincare')"
      >
        Open Skin Care
      </button>
    </section>
  `;
}


/* ------------------------------
   WEEKS
------------------------------ */

function renderWeeks() {
  let html = `
    <section class="hero">
      <div class="eyebrow">
        TRAINING PLAN
      </div>

      <h1>
        12 Weeks
      </h1>

      <p>
        Select a week to open
        its training schedule.
      </p>
    </section>

    <div class="week-grid">
  `;

  for (
    let week = 1;
    week <= 12;
    week++
  ) {
    const pct =
      weekCompletion(week);

    html += `
      <button
        class="week-button"
        onclick="openWeek(${week})"
      >
        <span class="week-number">
          ${week}
        </span>

        <span class="badge">
          ${phaseForWeek(week)}
        </span>

        <div class="week-status">
          ${pct}% complete
        </div>

        <div class="progress-track">
          <div
            class="progress-fill"
            style="width:${pct}%"
          ></div>
        </div>
      </button>
    `;
  }

  html += `
    </div>
  `;

  app.innerHTML = html;
}

function openWeek(week) {
  selectedWeek = week;

  const plan =
    getWeekPlan(week);

  let days = "";

  Object.entries(plan)
    .forEach(
      ([day, workout]) => {
        const status =
          dayStatus(
            week,
            day
          );

        days += `
          <button
            class="day-button"
            onclick="openDay('${day}')"
          >
            <div class="day-info">
              <strong>
                ${day}
              </strong>

              <span>
                ${workout.title}
                •
                ${workout.subtitle}
              </span>
            </div>

            <span
              class="status-dot ${status}"
            ></span>
          </button>
        `;
      }
    );

  const m =
    state.measurements[week] || {};

  const previous =
    state.measurements[week - 1] || {};

  app.innerHTML = `
    <button
      class="back"
      onclick="navigate('weeks')"
    >
      ← All Weeks
    </button>

    <section class="hero">
      <div class="eyebrow">
        ${phaseForWeek(week)} PHASE
      </div>

      <h1>
        Week ${week}
      </h1>
    </section>

    <section class="card">
      <div class="eyebrow">
        WEEKLY CHECK-IN
      </div>

      <h2>
        Body Metrics
      </h2>

      <div class="measurement-row">

        <div class="field">
          <label>
            WEIGHT (LB)
          </label>

          <input
            type="number"
            step="0.1"
            value="${m.weight ?? ""}"
            onchange="
              saveMeasurement(
                ${week},
                'weight',
                this.value
              )
            "
          >

          ${changeHTML(
            m.weight,
            previous.weight,
            "lb"
          )}
        </div>

        <div class="field">
          <label>
            WAIST (IN)
          </label>

          <input
            type="number"
            step="0.1"
            value="${m.waist ?? ""}"
            onchange="
              saveMeasurement(
                ${week},
                'waist',
                this.value
              )
            "
          >

          ${changeHTML(
            m.waist,
            previous.waist,
            "in"
          )}
        </div>

      </div>

      <div class="progress-track">
        <div
          class="progress-fill"
          style="
            width:
            ${weekCompletion(week)}%
          "
        ></div>
      </div>

      <small>
        ${weekCompletion(week)}%
        of scheduled training complete
      </small>
    </section>

    <div class="section-title">
      <div>
        <div class="eyebrow">
          SCHEDULE
        </div>

        <h2>
          Training Days
        </h2>
      </div>
    </div>

    ${days}
  `;
}
function openDay(day) {
  selectedDay = day;

  const workout =
    getWeekPlan(selectedWeek)[day];

  const wk =
    workoutKey(selectedWeek, day);

  const saved =
    state.workoutData[wk] || {};

  let exercises = "";

  workout.exercises.forEach(
    (item, index) => {
      const exerciseInfo =
        EX[item.id];

      const checked =
        state.completed[
          completedKey(
            selectedWeek,
            day,
            index
          )
        ]
          ? "checked"
          : "";

      const adjustedSets =
        state.recoveryMode &&
        workout.type === "strength"
          ? Math.max(
              2,
              Number(item.sets) - 1
            )
          : item.sets;

      exercises += `
        <div class="exercise">

          <input
            class="exercise-check"
            type="checkbox"
            ${checked}
            onchange="
              toggleExercise(
                ${selectedWeek},
                '${day}',
                ${index},
                this.checked
              )
            "
          >

          <button
            class="exercise-button"
            onclick="
              showExercise(
                '${item.id}'
              )
            "
          >
            <strong>
              ${exerciseInfo.name}
            </strong>

            <span>
              ${
                item.note ||
                "Tap for instructions & form cues"
              }
            </span>
          </button>

          <div class="exercise-prescription">
            ${adjustedSets}
            ×
            ${item.reps}

            <br>

            <span
              style="color:var(--muted)"
            >
              ${item.rest}
            </span>
          </div>
        </div>
      `;
    }
  );

  app.innerHTML = `
    <button
      class="back"
      onclick="
        openWeek(
          ${selectedWeek}
        )
      "
    >
      ← Week ${selectedWeek}
    </button>

    <section class="hero">
      <div class="eyebrow">
        WEEK ${selectedWeek}
        •
        ${day.toUpperCase()}
      </div>

      <h1>
        ${workout.title}
      </h1>

      <p>
        ${workout.subtitle}
      </p>
    </section>

    ${
      state.recoveryMode &&
      workout.type === "strength"
        ? `
          <div class="callout warning">
            Recovery Mode is active.
            Strength volume has been reduced.
          </div>
        `
        : ""
    }

    ${
      workout.cardio
        ? `
          <section class="card">
            <div class="eyebrow">
              SESSION TARGET
            </div>

            <h2>
              ${workout.cardio}
            </h2>
          </section>
        `
        : ""
    }

    ${
      workout.exercises.length
        ? `
          <section class="card">
            <div class="eyebrow">
              WORKOUT
            </div>

            ${exercises}
          </section>
        `
        : `
          <section class="card">
            <div class="eyebrow">
              ${
                workout.type === "rest"
                  ? "RECOVERY"
                  : "SESSION"
              }
            </div>

            <h2>
              ${workout.subtitle}
            </h2>

            <p>
              ${
                workout.type === "rest"
                  ? "No required training today. Easy walking or gentle mobility is optional."
                  : "Keep this session comfortable. The purpose is recovery and movement quality."
              }
            </p>
          </section>
        `
    }

    <section class="card">
      <div class="eyebrow">
        SESSION LOG
      </div>

      <div class="field">
        <label>
          RPE — HOW HARD DID THIS FEEL? (1–10)
        </label>

        <input
          type="number"
          min="1"
          max="10"
          value="${saved.rpe ?? ""}"
          onchange="
            saveWorkoutField(
              '${wk}',
              'rpe',
              this.value
            )
          "
        >
      </div>

      <div class="measurement-row">

        <div class="field">
          <label>
            CARDIO MINUTES
          </label>

          <input
            type="number"
            value="${saved.minutes ?? ""}"
            onchange="
              saveWorkoutField(
                '${wk}',
                'minutes',
                this.value
              )
            "
          >
        </div>

        <div class="field">
          <label>
            DISTANCE (MILES)
          </label>

          <input
            type="number"
            step="0.01"
            value="${saved.distance ?? ""}"
            onchange="
              saveWorkoutField(
                '${wk}',
                'distance',
                this.value
              )
            "
          >
        </div>

      </div>

      <div class="field">
        <label>
          AVERAGE HR — OPTIONAL
        </label>

        <input
          type="number"
          value="${saved.hr ?? ""}"
          onchange="
            saveWorkoutField(
              '${wk}',
              'hr',
              this.value
            )
          "
        >
      </div>

      <div class="field">
        <label>
          NOTES
        </label>

        <textarea
          onchange="
            saveWorkoutField(
              '${wk}',
              'notes',
              this.value
            )
          "
          placeholder="Energy, breathing, pain, what felt easy/hard..."
        >${saved.notes ?? ""}</textarea>
      </div>

      <button
        class="primary"
        onclick="
          markDayComplete(
            ${selectedWeek},
            '${day}'
          )
        "
      >
        Mark Day Complete
      </button>
    </section>
  `;
}


/* ------------------------------
   EXERCISE MODAL
------------------------------ */

function showExercise(id) {
  const exerciseInfo =
    EX[id];

  if (!exerciseInfo) return;

  const modalContent =
    document.getElementById(
      "modalContent"
    );

  const modal =
    document.getElementById(
      "modal"
    );

  if (
    !modalContent ||
    !modal
  ) {
    return;
  }

  modalContent.innerHTML = `
    <div class="exercise-detail">

      <div class="eyebrow">
        EXERCISE GUIDE
      </div>

      <h2>
        ${exerciseInfo.name}
      </h2>

      <p>
        ${exerciseInfo.how}
      </p>

      <h3>
        Key Pointers
      </h3>

      <ul class="cue-list">
        ${
          exerciseInfo.cues
            .map(
              cue =>
                `<li>${cue}</li>`
            )
            .join("")
        }
      </ul>

      <a
        href="${exerciseInfo.video}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          class="primary"
          type="button"
        >
          ▶ Watch Demonstration
        </button>
      </a>
    </div>
  `;

  modal.classList.remove(
    "hidden"
  );
}

function closeModal() {
  const modal =
    document.getElementById(
      "modal"
    );

  if (modal) {
    modal.classList.add(
      "hidden"
    );
  }
}


/* ------------------------------
   WORKOUT DATA
------------------------------ */

function saveMeasurement(
  week,
  field,
  value
) {
  if (!state.measurements[week]) {
    state.measurements[week] = {};
  }

  state.measurements[week][field] =
    value === ""
      ? ""
      : Number(value);

  saveData();
}

function changeHTML(
  current,
  previous,
  unit
) {
  if (
    current === undefined ||
    current === "" ||
    previous === undefined ||
    previous === ""
  ) {
    return `
      <small class="change neutral">
        Enter weekly
      </small>
    `;
  }

  const change =
    Math.round(
      (
        Number(current) -
        Number(previous)
      ) * 10
    ) / 10;

  if (change === 0) {
    return `
      <small class="change neutral">
        No change
      </small>
    `;
  }

  const sign =
    change > 0
      ? "+"
      : "";

  return `
    <small
      class="
        change
        ${
          change < 0
            ? "positive"
            : "neutral"
        }
      "
    >
      ${sign}${change}
      ${unit}
      from last week
    </small>
  `;
}

function saveWorkoutField(
  key,
  field,
  value
) {
  if (!state.workoutData[key]) {
    state.workoutData[key] = {};
  }

  state.workoutData[key][field] =
    value;

  saveData();
}

function toggleExercise(
  week,
  day,
  index,
  checked
) {
  const key =
    completedKey(
      week,
      day,
      index
    );

  if (checked) {
    state.completed[key] = true;
  } else {
    delete state.completed[key];
  }

  saveData();
}

function markDayComplete(
  week,
  day
) {
  const workout =
    getWeekPlan(week)[day];

  if (
    workout.exercises.length
  ) {
    workout.exercises.forEach(
      (_, index) => {
        state.completed[
          completedKey(
            week,
            day,
            index
          )
        ] = true;
      }
    );
  } else {
    state.completed[
      `${workoutKey(
        week,
        day
      )}-day`
    ] = true;
  }

  saveData();

  openDay(day);
}

function dayStatus(
  week,
  day
) {
  const workout =
    getWeekPlan(week)[day];

  if (!workout) {
    return "";
  }

  if (
    !workout.exercises.length
  ) {
    return state.completed[
      `${workoutKey(
        week,
        day
      )}-day`
    ]
      ? "complete"
      : "";
  }

  const completeCount =
    workout.exercises
      .filter(
        (_, index) =>
          state.completed[
            completedKey(
              week,
              day,
              index
            )
          ]
      )
      .length;

  if (
    completeCount ===
    workout.exercises.length
  ) {
    return "complete";
  }

  if (completeCount > 0) {
    return "partial";
  }

  return "";
}

function weekCompletion(week) {
  const plan =
    getWeekPlan(week);

  let total = 0;
  let complete = 0;

  Object.entries(plan)
    .forEach(
      ([day, workout]) => {
        if (
          workout.exercises.length
        ) {
          workout.exercises.forEach(
            (_, index) => {
              total++;

              if (
                state.completed[
                  completedKey(
                    week,
                    day,
                    index
                  )
                ]
              ) {
                complete++;
              }
            }
          );
        } else {
          total++;

          if (
            state.completed[
              `${workoutKey(
                week,
                day
              )}-day`
            ]
          ) {
            complete++;
          }
        }
      }
    );

  if (!total) {
    return 0;
  }

  return Math.round(
    (complete / total) * 100
  );
}

function totalCompletion() {
  let total = 0;
  let complete = 0;

  for (
    let week = 1;
    week <= 12;
    week++
  ) {
    const plan =
      getWeekPlan(week);

    Object.entries(plan)
      .forEach(
        ([day, workout]) => {
          if (
            workout.exercises.length
          ) {
            workout.exercises.forEach(
              (_, index) => {
                total++;

                if (
                  state.completed[
                    completedKey(
                      week,
                      day,
                      index
                    )
                  ]
                ) {
                  complete++;
                }
              }
            );
          } else {
            total++;

            if (
              state.completed[
                `${workoutKey(
                  week,
                  day
                )}-day`
              ]
            ) {
              complete++;
            }
          }
        }
      );
  }

  if (!total) {
    return 0;
  }

  return Math.round(
    (complete / total) * 100
  );
}

function toggleRecovery() {
  state.recoveryMode =
    !state.recoveryMode;

  saveData();
  renderHome();
}


/* ------------------------------
   PROGRESS
------------------------------ */

function renderProgress() {
  const weights = [];
  const waists = [];

  for (
    let week = 1;
    week <= 12;
    week++
  ) {
    const measurement =
      state.measurements[week] || {};

    if (
      measurement.weight !== undefined &&
      measurement.weight !== ""
    ) {
      weights.push({
        week,
        value:
          Number(
            measurement.weight
          )
      });
    }

    if (
      measurement.waist !== undefined &&
      measurement.waist !== ""
    ) {
      waists.push({
        week,
        value:
          Number(
            measurement.waist
          )
      });
    }
  }

  const latestWeight =
    weights.length
      ? weights[
          weights.length - 1
        ].value
      : "—";

  const latestWaist =
    waists.length
      ? waists[
          waists.length - 1
        ].value
      : "—";

  const weightChange =
    weights.length >= 2
      ? Math.round(
          (
            weights[
              weights.length - 1
            ].value -
            weights[0].value
          ) * 10
        ) / 10
      : null;

  const waistChange =
    waists.length >= 2
      ? Math.round(
          (
            waists[
              waists.length - 1
            ].value -
            waists[0].value
          ) * 10
        ) / 10
      : null;

  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">
        PROGRESS
      </div>

      <h1>
        Track the trend.
      </h1>

      <p>
        Focus on consistency across
        the full 12 weeks rather than
        reacting to a single weigh-in
        or workout.
      </p>
    </section>

    <section class="card">
      <div class="eyebrow">
        CURRENT METRICS
      </div>

      <div class="stat-grid">

        <div class="stat">
          <span class="stat-label">
            Weight
          </span>

          <span class="stat-value">
            ${latestWeight}${
              latestWeight !== "—"
                ? " lb"
                : ""
            }
          </span>
        </div>

        <div class="stat">
          <span class="stat-label">
            Waist
          </span>

          <span class="stat-value">
            ${latestWaist}${
              latestWaist !== "—"
                ? " in"
                : ""
            }
          </span>
        </div>

        <div class="stat">
          <span class="stat-label">
            Program
          </span>

          <span class="stat-value">
            ${totalCompletion()}%
          </span>
        </div>

      </div>

      ${
        weightChange !== null
          ? `
            <p>
              Weight change since
              first logged week:
              <strong>
                ${
                  weightChange > 0
                    ? "+"
                    : ""
                }${weightChange} lb
              </strong>
            </p>
          `
          : ""
      }

      ${
        waistChange !== null
          ? `
            <p>
              Waist change since
              first logged week:
              <strong>
                ${
                  waistChange > 0
                    ? "+"
                    : ""
                }${waistChange} in
              </strong>
            </p>
          `
          : ""
      }
    </section>

    <section class="card">
      <div class="eyebrow">
        WEEK-BY-WEEK
      </div>

      ${progressRows()}
    </section>
  `;
}

function progressRows() {
  let html = "";

  for (
    let week = 1;
    week <= 12;
    week++
  ) {
    const measurement =
      state.measurements[week] || {};

    html += `
      <div
        style="
          display:grid;
          grid-template-columns:
          1fr auto auto auto;
          gap:10px;
          padding:12px 0;
          border-bottom:
          1px solid var(--border);
          align-items:center;
        "
      >
        <div>
          <strong>
            Week ${week}
          </strong>

          <div
            style="
              color:var(--muted);
              font-size:11px;
              margin-top:3px;
            "
          >
            ${phaseForWeek(week)}
          </div>
        </div>

        <div>
          ${
            measurement.weight !== undefined &&
            measurement.weight !== ""
              ? `${measurement.weight} lb`
              : "—"
          }
        </div>

        <div>
          ${
            measurement.waist !== undefined &&
            measurement.waist !== ""
              ? `${measurement.waist} in`
              : "—"
          }
        </div>

        <div>
          ${weekCompletion(week)}%
        </div>
      </div>
    `;
  }

  return html;
}
/* ------------------------------
   AFT TESTING
------------------------------ */

function renderAFT() {
  const tests =
    Array.isArray(state.aftTests)
      ? state.aftTests
      : [];

  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">
        AFT TRACKER
      </div>

      <h1>
        Test. Record. Improve.
      </h1>

      <p>
        Save periodic performance checks so you can see
        whether your training is moving in the right direction.
      </p>
    </section>

    <section class="card">
      <div class="eyebrow">
        NEW TEST
      </div>

      <div class="measurement-row">
        <div class="field">
          <label>
            DATE
          </label>

          <input
            id="aftDate"
            type="date"
          >
        </div>

        <div class="field">
          <label>
            DEADLIFT (LB)
          </label>

          <input
            id="aftDeadlift"
            type="number"
          >
        </div>
      </div>

      <div class="measurement-row">
        <div class="field">
          <label>
            HAND-RELEASE PUSH-UPS
          </label>

          <input
            id="aftPushups"
            type="number"
          >
        </div>

        <div class="field">
          <label>
            PLANK
          </label>

          <input
            id="aftPlank"
            type="text"
            placeholder="Example: 2:15"
          >
        </div>
      </div>

      <div class="field">
        <label>
          2-MILE RUN
        </label>

        <input
          id="aftRun"
          type="text"
          placeholder="Example: 18:45"
        >
      </div>

      <div class="field">
        <label>
          NOTES
        </label>

        <textarea
          id="aftNotes"
          placeholder="Conditions, pacing, how you felt..."
        ></textarea>
      </div>

      <button
        class="primary"
        onclick="saveAFTTest()"
      >
        Save Test
      </button>
    </section>

    <section class="card">
      <div class="eyebrow">
        TEST HISTORY
      </div>

      ${
        tests.length
          ? tests
              .slice()
              .reverse()
              .map(
                (
                  test,
                  reverseIndex
                ) => {
                  const originalIndex =
                    tests.length -
                    1 -
                    reverseIndex;

                  return `
                    <div
                      style="
                        padding:16px 0;
                        border-bottom:
                        1px solid var(--border);
                      "
                    >
                      <div
                        style="
                          display:flex;
                          justify-content:
                          space-between;
                          align-items:center;
                          gap:10px;
                        "
                      >
                        <strong>
                          ${
                            test.date ||
                            "Undated Test"
                          }
                        </strong>

                        <button
                          class="text-button"
                          onclick="
                            deleteAFTTest(
                              ${originalIndex}
                            )
                          "
                        >
                          Delete
                        </button>
                      </div>

                      <div class="stat-grid">

                        <div class="stat">
                          <span class="stat-label">
                            Deadlift
                          </span>

                          <span class="stat-value">
                            ${
                              test.deadlift ||
                              "—"
                            }
                          </span>
                        </div>

                        <div class="stat">
                          <span class="stat-label">
                            HR Push-Ups
                          </span>

                          <span class="stat-value">
                            ${
                              test.pushups ||
                              "—"
                            }
                          </span>
                        </div>

                        <div class="stat">
                          <span class="stat-label">
                            Plank
                          </span>

                          <span class="stat-value">
                            ${
                              test.plank ||
                              "—"
                            }
                          </span>
                        </div>

                        <div class="stat">
                          <span class="stat-label">
                            2-Mile
                          </span>

                          <span class="stat-value">
                            ${
                              test.run ||
                              "—"
                            }
                          </span>
                        </div>

                      </div>

                      ${
                        test.notes
                          ? `
                            <p>
                              ${escapeHTML(
                                test.notes
                              )}
                            </p>
                          `
                          : ""
                      }
                    </div>
                  `;
                }
              )
              .join("")
          : `
            <p>
              No AFT tests saved yet.
              Add your first test above.
            </p>
          `
      }
    </section>
  `;

  const dateInput =
    document.getElementById(
      "aftDate"
    );

  if (
    dateInput &&
    !dateInput.value
  ) {
    dateInput.value =
      localDateKey();
  }
}

function saveAFTTest() {
  const test = {
    date:
      document.getElementById(
        "aftDate"
      )?.value || "",

    deadlift:
      document.getElementById(
        "aftDeadlift"
      )?.value || "",

    pushups:
      document.getElementById(
        "aftPushups"
      )?.value || "",

    plank:
      document.getElementById(
        "aftPlank"
      )?.value || "",

    run:
      document.getElementById(
        "aftRun"
      )?.value || "",

    notes:
      document.getElementById(
        "aftNotes"
      )?.value || ""
  };

  if (
    !Array.isArray(
      state.aftTests
    )
  ) {
    state.aftTests = [];
  }

  state.aftTests.push(test);

  saveData();
  renderAFT();
}

function deleteAFTTest(index) {
  if (
    !Array.isArray(
      state.aftTests
    )
  ) {
    return;
  }

  state.aftTests.splice(
    index,
    1
  );

  saveData();
  renderAFT();
}


/* ------------------------------
   HELPERS
------------------------------ */

function escapeHTML(value) {
  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}

function localDateKey() {
  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      now.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${year}-${month}-${day}`;
}


/* ------------------------------
   BACKUP + RESTORE
------------------------------ */

function renderBackup() {
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">
        DATA
      </div>

      <h1>
        Backup & Restore
      </h1>

      <p>
        Your training,
        measurements,
        AFT tests and skincare
        completion are stored locally
        on this device.
      </p>
    </section>

    <section class="card">
      <div class="eyebrow">
        BACKUP
      </div>

      <h2>
        Export your data.
      </h2>

      <p>
        Copy the text below
        and save it somewhere safe.
      </p>

      <textarea
        id="backupOutput"
        readonly
        style="min-height:220px;"
      >${escapeHTML(
        JSON.stringify(state)
      )}</textarea>

      <button
        class="primary"
        onclick="copyBackup()"
      >
        Copy Backup
      </button>
    </section>

    <section class="card">
      <div class="eyebrow">
        RESTORE
      </div>

      <h2>
        Import a backup.
      </h2>

      <p>
        Paste a previously exported
        FORGE backup below.
        Importing replaces the data
        currently stored on this device.
      </p>

      <textarea
        id="restoreInput"
        style="min-height:220px;"
        placeholder="Paste FORGE backup here..."
      ></textarea>

      <button
        class="secondary"
        onclick="restoreBackup()"
      >
        Restore Backup
      </button>
    </section>

    <section class="card">
      <div class="eyebrow">
        RESET
      </div>

      <h2>
        Start over.
      </h2>

      <p>
        This permanently clears
        the locally stored FORGE data
        from this browser.
      </p>

      <button
        class="danger"
        onclick="resetData()"
      >
        Reset All Data
      </button>
    </section>
  `;
}

async function copyBackup() {
  const output =
    document.getElementById(
      "backupOutput"
    );

  if (!output) {
    return;
  }

  output.select();

  output.setSelectionRange(
    0,
    output.value.length
  );

  try {
    await navigator.clipboard
      .writeText(
        output.value
      );

    alert(
      "FORGE backup copied."
    );
  } catch {
    document.execCommand(
      "copy"
    );

    alert(
      "FORGE backup copied."
    );
  }
}

function restoreBackup() {
  const input =
    document.getElementById(
      "restoreInput"
    );

  if (
    !input ||
    !input.value.trim()
  ) {
    alert(
      "Paste a backup first."
    );
    return;
  }

  try {
    const imported =
      JSON.parse(
        input.value.trim()
      );

    if (
      !imported ||
      typeof imported !== "object" ||
      Array.isArray(imported)
    ) {
      throw new Error(
        "Invalid backup"
      );
    }

    state = {
      ...defaultData,
      ...imported,

      measurements:
        imported.measurements || {},

      completed:
        imported.completed || {},

      workoutData:
        imported.workoutData || {},

      aftTests:
        Array.isArray(
          imported.aftTests
        )
          ? imported.aftTests
          : [],

      skincareCompleted:
        imported.skincareCompleted ||
        {}
    };

    saveData();

    alert(
      "FORGE backup restored."
    );

    renderHome();
  } catch {
    alert(
      "That backup could not be restored. Make sure you pasted the complete FORGE backup."
    );
  }
}

function resetData() {
  const confirmed =
    confirm(
      "Reset all FORGE data on this device? This cannot be undone unless you have a backup."
    );

  if (!confirmed) {
    return;
  }

  state = {
    measurements: {},
    completed: {},
    workoutData: {},
    aftTests: [],
    recoveryMode: false,
    skincareCompleted: {}
  };

  saveData();
  renderHome();
}


/* ------------------------------
   DRAWER
------------------------------ */

const drawer =
  document.getElementById(
    "drawer"
  );

const drawerOverlay =
  document.getElementById(
    "drawerOverlay"
  );

const menuBtn =
  document.getElementById(
    "menuBtn"
  );

const closeMenuBtn =
  document.getElementById(
    "closeMenu"
  );

function openDrawer() {
  if (drawer) {
    drawer.classList.add(
      "open"
    );
  }

  if (drawerOverlay) {
    drawerOverlay.classList.add(
      "open"
    );
  }
}

function closeDrawer() {
  if (drawer) {
    drawer.classList.remove(
      "open"
    );
  }

  if (drawerOverlay) {
    drawerOverlay.classList.remove(
      "open"
    );
  }
}

if (menuBtn) {
  menuBtn.addEventListener(
    "click",
    openDrawer
  );
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener(
    "click",
    closeDrawer
  );
}

if (drawerOverlay) {
  drawerOverlay.addEventListener(
    "click",
    closeDrawer
  );
}

document
  .querySelectorAll(
    "[data-view]"
  )
  .forEach(button => {
    button.addEventListener(
      "click",
      () => {
        const view =
          button.dataset.view;

        closeDrawer();

        navigate(view);
      }
    );
  });


/* ------------------------------
   MODAL EVENTS
------------------------------ */

const modal =
  document.getElementById(
    "modal"
  );

document
  .querySelectorAll(
    "[data-close-modal]"
  )
  .forEach(button => {
    button.addEventListener(
      "click",
      closeModal
    );
  });

if (modal) {
  modal.addEventListener(
    "click",
    event => {
      if (
        event.target === modal
      ) {
        closeModal();
      }
    }
  );
}


/* ------------------------------
   REST TIMER
------------------------------ */

const timerPanel =
  document.getElementById(
    "timerPanel"
  );

const timerBtn =
  document.getElementById(
    "timerBtn"
  );

const closeTimerBtn =
  document.getElementById(
    "closeTimer"
  );

const timerDisplay =
  document.getElementById(
    "timerDisplay"
  );

const timerStart =
  document.getElementById(
    "timerStart"
  );

const timerReset =
  document.getElementById(
    "timerReset"
  );

let timerSeconds = 60;
let timerRemaining = 60;
let timerInterval = null;
let timerRunning = false;

function updateTimerDisplay() {
  if (!timerDisplay) {
    return;
  }

  const minutes =
    Math.floor(
      timerRemaining / 60
    );

  const seconds =
    timerRemaining % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(
      2,
      "0"
    )}`;
}

function openTimer() {
  if (timerPanel) {
    timerPanel.classList.remove(
      "hidden"
    );
  }
}

function closeTimer() {
  if (timerPanel) {
    timerPanel.classList.add(
      "hidden"
    );
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(
      timerInterval
    );

    timerInterval = null;
  }

  timerRunning = false;

  if (timerStart) {
    timerStart.textContent =
      "Start";
  }
}

function startTimer() {
  if (timerRunning) {
    stopTimer();
    return;
  }

  if (
    timerRemaining <= 0
  ) {
    timerRemaining =
      timerSeconds;

    updateTimerDisplay();
  }

  timerRunning = true;

  if (timerStart) {
    timerStart.textContent =
      "Pause";
  }

  timerInterval =
    setInterval(
      () => {
        timerRemaining -= 1;

        if (
          timerRemaining <= 0
        ) {
          timerRemaining = 0;

          updateTimerDisplay();
          stopTimer();

          if (
            "vibrate" in navigator
          ) {
            navigator.vibrate(
              [200, 100, 200]
            );
          }

          return;
        }

        updateTimerDisplay();
      },
      1000
    );
}

function resetTimer() {
  stopTimer();

  timerRemaining =
    timerSeconds;

  updateTimerDisplay();
}

if (timerBtn) {
  timerBtn.addEventListener(
    "click",
    openTimer
  );
}

if (closeTimerBtn) {
  closeTimerBtn.addEventListener(
    "click",
    closeTimer
  );
}

if (timerStart) {
  timerStart.addEventListener(
    "click",
    startTimer
  );
}

if (timerReset) {
  timerReset.addEventListener(
    "click",
    resetTimer
  );
}

document
  .querySelectorAll(
    ".timer-presets [data-seconds]"
  )
  .forEach(button => {
    button.addEventListener(
      "click",
      () => {
        stopTimer();

        timerSeconds =
          Number(
            button.dataset.seconds
          );

        timerRemaining =
          timerSeconds;

        updateTimerDisplay();
      }
    );
  });

if (timerPanel) {
  timerPanel.addEventListener(
    "click",
    event => {
      if (
        event.target === timerPanel
      ) {
        closeTimer();
      }
    }
  );
}


/* ------------------------------
   ESCAPE KEY
------------------------------ */

document.addEventListener(
  "keydown",
  event => {
    if (
      event.key === "Escape"
    ) {
      closeModal();
      closeDrawer();
      closeTimer();
    }
  }
);


/* ------------------------------
   SERVICE WORKER
------------------------------ */

if (
  "serviceWorker" in navigator
) {
  window.addEventListener(
    "load",
    () => {
      navigator
        .serviceWorker
        .register(
          "sw.js"
        )
        .catch(error => {
          console.error(
            "Service worker registration failed:",
            error
          );
        });
    }
  );
}


/* ------------------------------
   START APP
------------------------------ */

updateTimerDisplay();
renderHome();
