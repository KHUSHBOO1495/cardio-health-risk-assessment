def classify_risk(
    prob,
    age,
    ap_hi,
    ap_lo,
    chol,
    gluc,
    smoke,
    alco
):
    # -------- HIGH RISK (CLINICAL OVERRIDE) --------
    if (
        ap_hi >= 160 or
        ap_lo >= 100 or
        (chol == 3 and gluc == 3)
    ):
        return "HIGH"

    # -------- MODERATE RISK CONDITIONS --------
    moderate_conditions = [
        age >= 60,
        smoke == 1,
        alco == 1,
        chol >= 2,
        gluc >= 2,
        ap_lo >= 90
    ]

    if sum(moderate_conditions) >= 2 or prob >= 0.4:
        return "MODERATE"

    # -------- LOW RISK --------
    return "LOW"
