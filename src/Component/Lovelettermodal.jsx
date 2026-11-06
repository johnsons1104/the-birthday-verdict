import React from "react";
import { motion } from "framer-motion";
import "./LoveLetterModal.css";

/* Handwritten love letter popup (opens from the success screen) */
const LoveLetterModal = ({ onClose }) => (
    <motion.div
        className="lt-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
    >
        <motion.div
            className="lt-card"
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                type="button"
                className="lt-close"
                onClick={onClose}
                aria-label="Close letter"
            >
                ✕
            </button>

            <div className="lt-scroll">
                <div className="lt-emoji">💌</div>

                <h2>✝ A LOVE BLESSED BY GOD ✝</h2>

                <h3>❤️ A Beautiful Verse About Love</h3>
                <h4>Song of Solomon 3:4</h4>

                <p>
                    "I have found the one whom my soul loves; I held him and would not
                    let him go." ❤️
                </p>

                <p className="lt-tamil">
                    "என் ஆத்துமா நேசிக்கிறவரைக் கண்டேன்; அவரைப் பிடித்துக்கொண்டேன்."
                </p>

                <h3>💍 A Love United by God</h3>
                <h4>Matthew 19:6</h4>

                <p>
                    "So they are no longer two, but one flesh. Therefore what God has
                    joined together, let no one separate." ✝️
                </p>

                <p className="lt-tamil">
                    "ஆகையால், அவர்கள் இனி இருவரல்ல, ஒரே மாம்சமாயிருக்கிறார்கள்; ஆகவே
                    தேவன் இணைத்ததை மனுஷன் பிரிக்காதிருக்கக்கடவன்."
                </p>

                <div className="lt-divider">♡ ♡ ♡</div>

                <h2>Dear Bettina, 🥹💗</h2>

                <p>
                    I believe that every beautiful thing in life is a blessing from God.
                    And sometimes, I feel that having you in my life is one of those
                    blessings I never want to take for granted.
                </p>

                <p>
                    May God always guide us, protect our hearts, and fill our lives with
                    love, peace, happiness, and beautiful memories.
                </p>

                <p>
                    With God's grace, may our love always grow stronger, our bond become
                    deeper, and our hearts remain filled with faith, love, and
                    understanding.
                </p>

                <p className="lt-highlight">
                    You are one of the most beautiful blessings in my life. ❤️🫶🏻
                </p>

                <div className="lt-divider">♡ ♡ ♡</div>

                <h2>❤️ One Last Thing, My Dear Bettina...</h2>

                <p>Namma love story ippo dhaan start aagudhu... 🥹</p>

                <p>
                    Innum neraya memories create pannanum, neraya sirikkanum, chinna
                    chinna fights pottu marubadiyum samadhanam aaganum... life-la varra
                    ella beautiful moments-um un kooda share pannanum nu aasai.
                </p>

                <p>
                    En feelings-ku words konjam kammi dhaan... sometimes enna feel
                    panren nu ennaala kooda full-ah express panna mudiyadhu.
                </p>

                <p>
                    Nee enna surprise pannumbodhu, enakku sirikka kooda varama oru
                    different expression vandhudum... 😂❤️
                </p>

                <p>
                    Aana andha expression-ku pinnadi, unna evlo love panren nu unakku
                    theriyuma Bettina?
                </p>

                <p className="lt-highlight">
                    Un mela naan vachirukkura love, naan words-la solluradha vida romba
                    adhigam. 🥹❤️
                </p>

                <p>
                    And honestly, nee ennakaga un life-la evlo things change
                    pannirukka... evlo adjust pannirukka... evlo sanda pottalum, fun-ah
                    ennakooda irundhirukka... evlo times enna purinjukka try
                    pannirukka nu naan notice pannama illa, Bettina. 🥹❤️
                </p>

                <p>
                    Sometimes, enakkum un kooda neraya time spend pannanum nu aasai
                    irukkum. Work mudichitu veetukku vandha apram, un kooda konjam neram
                    pesanum, un day-la enna nadandhuchu nu kekkanum, en day-la nadandha
                    things ellam un kitta share pannanum nu thonum.
                </p>

                <p>
                    Enna vida nee dhaan en messages-kaga neraya neram wait pannuva...
                    ovvoru notification varumbodhum, "Ithu avan message-ah irukkumo...
                    enakkuthana message vandhirukku?" nu phone-ah eduthu paapa. 🥹❤️
                </p>

                <p>
                    Andha chinna chinna moments nenacha kooda enakku romba special-ah
                    irukkum. Namma rendu perum busy-ah irundhaalum, un manasula enakku
                    irukkura andha place-um, en messages-kaga nee wait panra andha
                    feeling-um enakku romba precious.
                </p>

                <p>
                    Of course, unakkum college irukku, morning ezhundhu poganum, un
                    responsibilities irukku nu enakku theriyum. Adhe maari enakkum work
                    irukku.
                </p>

                <p>
                    Aana andha busy days-ku naduvula, night konjam neram un kooda
                    pesitu thoonguradhu... un day pathi kekkuradhu... en day pathi un
                    kitta share panradhu...
                </p>

                <p className="lt-highlight">
                    Andha little moments dhaan enakku romba special. ❤️
                </p>

                <p>
                    Namma rendu perum busy-ah irundhaalum, konjam time kidaikkumbodhu
                    adha un kooda spend panradhu enakku romba happiness kudukkum.
                </p>

                <p>
                    Unna change aaganum nu naan expect pannala... nee nee-ahve
                    irukkanum. But nee ennakaga edukkura efforts, nee ennakaga adjust
                    pannura moments, nee enna purinjukka try pannura ovvoru vishayamum
                    enakku evlo special nu mattum nee therinjukkanum.
                </p>

                <p className="lt-highlight">
                    Naan idhellam notice pannama illa, Bettina... un chinna chinna
                    efforts kooda en heart-la romba periya place occupy pannirukku.
                    🫂❤️
                </p>

                <p>
                    I may not be the perfect person, and I may not always know how to
                    express my love properly... but one thing is true:
                </p>

                <p className="lt-highlight">
                    Unna love panradhu enakku just oru feeling illa Bettina... it's
                    something I genuinely cherish with all my heart. ❤️🫂
                </p>

                <p>
                    Indha letter inga mudiyala... just en pen-la ink dhaan ippo konjam
                    theerndhuduchu. 😂💌
                </p>

                <p>
                    Ink refill pannitu thirumba ezhudhalaam... aana namma love story-ku
                    ending nu onnu irukka koodadhu.
                </p>

                <p className="lt-highlight">
                    Namma story-oda first chapter ippo dhaan start aagudhu...
                </p>

                <p>
                    Innum neraya chapters irukku... happy moments, unexpected surprises,
                    konjam fights, neraya love... ellathayum un kooda experience
                    pannanum.
                </p>

                <p>
                    And I hope, with God's blessings, we get to write every beautiful
                    chapter together. ✝️❤️
                </p>

                <div className="lt-divider">♡ ♡ ♡</div>

                <h3>⚖️ THE FINAL VERDICT ⚖️</h3>


                <p>
                    If love were a courtroom, Bettina... un mela naan file pannirukkura
                    case dhaan en heart-oda most beautiful case. ❤️
                </p>

                <p>
                    Nee oru law student... cases argue pannuva, laws interpret pannuva,
                    justice-kaga fight pannuva. Aana en heart-la nee create pannina
                    impact-ku endha law book-layum explanation irukkaadhu.
                    Unna theriyama love pannala... therinju, ovvoru naalum
                    innum konjam adhigama love panren. 🥹
                </p>

                <p>
                    Intha court-la naan submit panra Exhibit A — en heart,
                    Exhibit B — un mela naan vachirukkura endless care,
                    Exhibit C — namma share pannina ovvoru beautiful memory.
                    Ivai ellame un innocence-ku illa... un specialness-ku evidence. 💌
                </p>

                <p>
                    Un smile-ku against-ah endha objection-um illa...
                    un presence-ku endha appeal-um thevai illa...
                    Unna love panra feelings-ah withdraw panna naan
                    endha petition-um file panna maatten. 💕
                </p>

                <p>
                    Unakku oru charge mattum irukku, Bettina...
                    <strong>En permission illama en heart-ah steal pannitta!</strong>
                    Aana honestly, andha theft-ku naan complaint kudukka maatten.
                    Because adhu dhaan en life-la nadandha sweetest crime. 😂❤️
                </p>

                <p>
                    Namma share pannina memories, un smile, un chinna chinna
                    surprises, un care... ellathayum carefully examine pannina
                    indha court, unakku oru verdict announce pannudhu...
                    <strong>GUILTY — En heart-la forever special-ah irukkuradhukku!</strong> 🥹⚖️
                </p>

                <p>
                    Sentence enna theriyuma?
                    <strong>Lifetime imprisonment with unlimited love, endless care,
                        countless smiles, beautiful memories, and a permanent place
                        in my heart... without any possibility of appeal. ❤️🫶🏻</strong>
                </p>


                <h3>Case No. 143 — The Case of My Heart 💗</h3>

                <div className="lt-signature">
                    With all my love,
                    <br />
                    Your Favorite Person,
                    <br />
                    Always &amp; Forever ❤️🫶🏻
                </div>

                <p className="lt-footer">
                    Case closed for today... but our love story continues. ⚖️💌
                </p>
            </div>
        </motion.div>
    </motion.div>
);

export default LoveLetterModal;;