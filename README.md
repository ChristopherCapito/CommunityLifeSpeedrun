# CommunityLifeSpeedrun

### Was bisher geschah:

Soooo… ich hab so schnell getippt wie konnte, und so viel im Kopf behalten wie ich konnte. Weiter bin ich in 25 min nicht gekommen.

Da ich ja normalerweise viel Frontend Zeug mache, hier aber vor allem viel Backend gefragt war, habe ich auch damit angefangen.

### Ziel (I guess)
- Nutzer kann sich registrieren
- Nutzer kann sich einloggen
- Nutzer kann sich ausloggen
- Nutzer kann seine Credentials ändern.

### Ablauf
Ich habe also zuerst mal alles required/installiert was man dafür (zumindest aus dem Kopf heraus) braucht.

Als relativ simples Login Schema hab ich passport-local genommen. Realistischer wären da heute natürlich diverse Social Logins oder Face-Id/Touch-Id über zB. react-native (hab ich allerdings noch nicht genutzt).

Danach habe ich zunächst mal eins zwei middlewares required die ich sowieso die ganze Zeit brauche (auch ejs-layouts, zum frontend bin ich leider nicht gekommen).

Oh, und eslint natürlich ganz am Anfang, weil ich meinem Musclememory nicht traue.

Danach habe ich das User-Model geschrieben und die Datenbank connected

Mit dem grundlegenden aus dem Weg, habe ich angefangen die Routes vorzuschreiben. Es gibt Leute die schreiben gerne one-by-one, ich schreib mir persönlich (das ist wieder der Lehrer) erstmal ein Scaffolding damit ich weiß, was alles ansteht, und wie viele Routes da überhaupt reinmüssen.

Die Routes habe ich wie folgt befüllt:

### 1. POST Register
Mit bcrypt zum hashen des passworts. normalerweise würde man hier den ganzen input sanitizen und validieren, aber das hab ich jetzt aus zeitgründen weggelassen.

### 2. POST Login
Quick paste aus der passport documentation. Danach habe ich erstmal die passport config erstellt. Hier, also im config file, wird auch direkt das passwort gescheckt via bcrypt.

Wichtig: Das hier ist jetzt richtig roh. Normalerweise sollte sowas minimum über JWT laufen.

Danach habe ich ne kleine helper datei geschrieben, die einfach checkt ob der Nutzer authentifiziert ist.

### 3. POST Logout
War ja nur eine Zeile hehe

### 4. PUT Update
Hier bin ich dann auch ans ende der Zeit gekommen, dabei konnte ich nichtmal alles schnell genug testen in Postman.

Die Update funktion is hier nur für email und passwort. und so wie sie geschrieben ist, ist die super ineffizient. Ich hab dann gemerkt, dass ich eigentlich eine presave funktion einbauen müsste, falls ich alles in einer Funktion updaten will, sonst ist bcrypt zu langsam, und schickt den neuen hash nicht mit. Generell ist die Update-Funktion ziemlich ineffizient und würde schnell ziemlich groß werden für viele Felder.
