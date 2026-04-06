-- ============================================================
-- FBK Website – Zusätzliche Blog-Artikel (9 Stück)
-- Im Supabase SQL-Editor nach seed.sql ausführen
-- ============================================================

-- Artikel 4: Fräsmaschinen kaufen
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'fraesmaschinen-kaufen-ratgeber',
  'Fräsmaschinen kaufen – Der große Ratgeber für Industrie und Handwerk',
  'Universalfräse, Konsolenfräse, Bettfräse oder CNC-Bearbeitungszentrum? Wir erklären die Unterschiede und worauf Sie beim Kauf einer Fräsmaschine achten sollten.',
  $md$
# Fräsmaschinen kaufen – Der große Ratgeber für Industrie und Handwerk

Die Fräsmaschine gehört neben der Drehmaschine zu den wichtigsten Werkzeugmaschinen in der Metallbearbeitung. Doch welche Bauform passt zu Ihrem Betrieb? Und worauf kommt es beim Kauf – neu oder gebraucht – wirklich an? Dieser Ratgeber gibt Ihnen einen strukturierten Überblick.

## Die wichtigsten Fräsmaschinenbauformen

### Konsolenfräsmaschinen (Universal- und Waagerecht-Fräsmaschinen)

Die klassische Konsolenfräsmaschine – bekannt durch Hersteller wie Deckel, Maho oder Bridgeport – ist seit Jahrzehnten das Arbeitstier in Werkzeug- und Maschinenbaubetrieben. Der Tisch lässt sich in drei Achsen (X, Y, Z) verfahren, bei Universalmaschinen zusätzlich schwenken. Sie eignen sich hervorragend für Einzelteile, Reparaturarbeiten und kleinere Serien.

**Typische Hersteller:** Deckel FP1/FP2/FP4, Maho MH 400/600/700, Bridgeport, Emco FB

**Für wen geeignet:** Werkstätten, Werkzeugbau, Lohnfertiger mit Einzelteilen

### Bettfräsmaschinen

Bei Bettfräsmaschinen ist der Tisch in der Höhe fest, der Fräskopf bewegt sich vertikal. Diese Bauform ist steifer als die Konsolenfräse und eignet sich für schwerere Werkstücke und größere Zerspanvolumen. Verbreitet in der Serienfertigung und im Lohnfräsen.

**Typische Hersteller:** Waldrich Coburg, Scharmann, Droop & Rein, TOS

**Für wen geeignet:** Mittlere bis große Betriebe, Serienfertigung, schwere Teile

### CNC-Fräsmaschinen und Bearbeitungszentren

Mit der Einführung numerischer Steuerungen wurde aus der konventionellen Fräse das CNC-Bearbeitungszentrum. Moderne Maschinen kombinieren Fräsen, Bohren und Gewindeschneiden in einer Aufspannung und erreichen Wiederholgenauigkeiten im Mikrometerbereich.

**Typische Hersteller:** Hermle, DMG Mori, Chiron, Mazak, Heidenhain-gesteuerte Deckel-Maho-Maschinen

**Für wen geeignet:** Serienfertigung, Präzisionsteilefertigung, komplexe Konturen

## Wichtige technische Kenngrößen

Beim Kauf einer Fräsmaschine sollten folgende Parameter bekannt sein:

- **Verfahrwege (X/Y/Z):** Bestimmt die maximale Werkstückgröße
- **Tischgröße und -last:** Breite × Länge, maximale Aufspannlast
- **Spindeldrehzahl:** Wichtig für die Bearbeitung verschiedener Werkstoffe
- **Spindelaufnahme:** SK 30, SK 40, SK 50 oder HSK – beeinflusst das Werkzeugspektrum
- **Antriebsleistung:** Relevant für Schruppen und schwere Zerspanung

## Neu oder gebraucht – eine ehrliche Einschätzung

Eine neue CNC-Fräsmaschine für die Serienfertigung kostet schnell 80.000 bis 300.000 Euro oder mehr. Eine gut erhaltene Gebrauchtmaschine vom gleichen Hersteller kann für 15.000 bis 60.000 Euro zu haben sein – und liefert dieselbe Präzision, sofern sie ordentlich gewartet wurde.

**Unser Tipp:** Lassen Sie die Geometrie einer Gebrauchtmaschine vor dem Kauf prüfen. Ein erfahrener Maschinenhandel prüft Führungen, Spindel und Steuerung und gibt Ihnen ehrliches Feedback.

## Worauf Sie beim Kauf achten sollten

1. **Führungszustand:** Lineare Führungen oder Prismenführungen – beide können nachgeschliffen werden, aber das kostet. Spiegel und Riefenfreiheit prüfen.
2. **Spindellager:** Geräuschlos, kein axialer Schlag, kein unrunder Lauf.
3. **Steuerungsversion:** Siemens, Fanuc, Heidenhain – ist die Software noch aktuell? Sind Ersatzteile verfügbar?
4. **Kühlmittelanlage:** Auf Korrosion und Dichtigkeit achten.
5. **Unterlagen und Zeichnungen:** Vorhandene Maschinenunterlagen erleichtern Wartung und Reparatur erheblich.
6. **Probelauf verlangen:** Immer. Ohne Laufprobe kein Kauf.

## Typische Preise für gebrauchte Fräsmaschinen (Orientierung)

| Maschinentyp | Preisrahmen gebraucht |
|---|---|
| Konsolenfräse (konv.) | 2.000 – 12.000 € |
| Konsolenfräse mit Digitalanzeige | 4.000 – 18.000 € |
| Bettfräse (CNC) | 10.000 – 50.000 € |
| Vertikales BAZ (3-Achse) | 15.000 – 80.000 € |

---

Wir haben regelmäßig Fräsmaschinen aller Bauformen im Bestand. Sprechen Sie uns an – wir helfen Ihnen, die richtige Maschine für Ihre Anforderungen zu finden.
  $md$,
  'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?w=1200&auto=format&fit=crop&q=80',
  'Ratgeber',
  'Fräsmaschinen kaufen – Ratgeber für Industrie und Handwerk | Firmenberatung Kassel',
  'Konsolenfräse, Bettfräse oder CNC-BAZ? Unser Ratgeber erklärt die Unterschiede und worauf Sie beim Kauf einer neuen oder gebrauchten Fräsmaschine achten sollten.',
  true
);

-- Artikel 5: Werkzeugmaschinen warten
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'werkzeugmaschinen-warten-und-pflegen',
  'Werkzeugmaschinen richtig warten – So verlängern Sie die Lebensdauer Ihrer Maschinen',
  'Regelmäßige Wartung zahlt sich aus: Gut gepflegte Werkzeugmaschinen laufen jahrzehntelang präzise und zuverlässig. Wir zeigen, worauf es bei der Instandhaltung ankommt.',
  $md$
# Werkzeugmaschinen richtig warten – So verlängern Sie die Lebensdauer Ihrer Maschinen

Eine Werkzeugmaschine ist eine Investition – oft über viele Jahre oder sogar Jahrzehnte. Ob Drehmaschine, Fräse oder Schleifmaschine: Wer regelmäßig wartet, spart langfristig erhebliche Kosten und erhält gleichzeitig die Präzision seiner Maschinen.

## Warum regelmäßige Wartung so wichtig ist

Verschleiß ist normal. Führungen, Lager, Dichtungen und Antriebskomponenten unterliegen kontinuierlichem Abrieb. Was jedoch vermeidbar ist: vorzeitiger Verschleiß durch mangelnde Schmierung, korrosive Schäden durch altes Kühlmittel oder Schäden durch Stillstand.

Ein gut geführtes Wartungsprotokoll zeigt außerdem den Wert einer Maschine beim späteren Wiederverkauf – und spart im Schadensfall Zeit bei der Fehlerdiagnose.

## Tägliche Wartungsmaßnahmen

Diese Punkte sollten täglich oder bei jeder Inbetriebnahme geprüft werden:

- **Kühlmittelstand prüfen** und ggf. nachfüllen
- **Maschinenbett und Führungen** von Spänen reinigen
- **Sichtprüfung** auf Leckagen (Öl, Kühlmittel, Hydraulikflüssigkeit)
- **Spannmittel und Werkzeuge** auf festen Sitz kontrollieren
- **Schutzabdeckungen** auf Vollständigkeit und Funktion prüfen

## Wöchentliche Wartungsmaßnahmen

- **Führungen schmieren:** Je nach Maschinentyp mit Schlittenöl, Getriebeöl oder Fett. Die Herstellervorschriften beachten – falsches Schmiermittel kann mehr schaden als nützen.
- **Zentralschmieranlage** auf Funktion und Füllstand prüfen
- **Spindelkopf und Werkzeugspannung** auf Verschmutzung und Funktion kontrollieren
- **Kühlmittelsystem** auf Geruch (Bakterienbefall) und Konzentration prüfen

## Monatliche Wartungsmaßnahmen

- **Kühlmittel komplett wechseln** (je nach Einsatz auch häufiger): Altes Kühlmittel greift Metallteile an, riecht unangenehm und begünstigt Bakterien.
- **Ölwechsel** bei Getrieben und Hydraulik gemäß Herstellervorschrift
- **Elektrische Anschlüsse** auf festen Sitz und Korrosion prüfen
- **Filtereinsätze** in Hydraulik und Pneumatik tauschen
- **Lüftungsgitter** und Kühlkörper der Steuerung reinigen

## Typische Verschleißteile und ihre Lebensdauer

| Bauteil | Typische Lebensdauer |
|---|---|
| Führungsbuchsen (Kunststoff) | 2.000 – 5.000 Betriebsstunden |
| Wälzlager Spindel | 10.000 – 30.000 Betriebsstunden |
| Hydraulikdichtungen | 3 – 7 Jahre |
| Kühlmittel | 3 – 6 Monate |
| Schmiernippel und -leitungen | Nach Bedarf |

## Stillstandsschäden vermeiden

Ein unterschätztes Problem: Maschinen, die längere Zeit stillstehen, nehmen oft mehr Schaden als im Dauerbetrieb. Führungen oxidieren, Dichtungen trocknen aus, Schmiermittel setzt sich ab.

**Unsere Empfehlung:** Maschinen, die nicht täglich genutzt werden, mindestens einmal pro Woche kurz in Betrieb nehmen – alle Achsen durchfahren, Spindel anlaufen lassen. Das hält Führungen geschmiert und Dichtungen elastisch.

## Wann lohnt sich eine Generalüberholung?

Wenn eine Maschine messbar ungenau wird – Fertigungstoleranzen werden nicht mehr eingehalten, Maßabweichungen häufen sich –, ist eine Überholung oft wirtschaftlicher als ein Neukauf. Typische Maßnahmen einer Generalüberholung:

- Führungen schleifen oder einschaben
- Spindellager tauschen
- Hydrauliksystem generalüberholen
- Steuerung aktualisieren oder ersetzen

Die Kosten einer Überholung liegen je nach Maschinentyp zwischen 3.000 und 30.000 Euro – bei einem Neumaschinenpreis von 50.000 bis 200.000 Euro oft eine klare Rechnung.

## Wartungsprotokoll führen – so einfach geht es

Ein einfaches Excel-Tabelle oder ein DIN A4-Zettel pro Maschine genügt. Notieren Sie:
- Datum der Wartung
- Durchgeführte Maßnahmen
- Verbrauchtes Material (Ölsorte, Menge)
- Auffälligkeiten und Beschädigungen
- Nächste geplante Wartung

Dieser Aufwand zahlt sich mehrfach aus – beim Betrieb, beim Verkauf und bei der Fehlersuche im Schadensfall.

---

Sie möchten eine gebrauchte Maschine kaufen und wissen nicht, wie gut sie gewartet wurde? Wir prüfen für Sie den Zustand vor dem Kauf und beraten Sie ehrlich über anfallende Wartungskosten.
  $md$,
  'https://images.unsplash.com/photo-1681407979977-ea6060c802f6?w=1200&auto=format&fit=crop&q=80',
  'Ratgeber',
  'Werkzeugmaschinen richtig warten – Tipps zur Instandhaltung | Firmenberatung Kassel',
  'So verlängern Sie die Lebensdauer Ihrer Werkzeugmaschinen: tägliche, wöchentliche und monatliche Wartungsmaßnahmen, Verschleißteile und Stillstandsschutz.',
  true
);

-- Artikel 6: Metallbandsägen
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'metallbandsaegen-manuell-automatisch-vergleich',
  'Metallbandsägen im Überblick – Manuell, halbautomatisch oder vollautomatisch?',
  'Bandsägeautomat oder manuelle Metallbandsäge? Wir erklären die Unterschiede, worauf es bei der Blattauswahl ankommt und welche Maschine für Ihren Betrieb die richtige ist.',
  $md$
# Metallbandsägen im Überblick – Manuell, halbautomatisch oder vollautomatisch?

Die Metallbandsäge ist in nahezu jeder metallverarbeitenden Werkstatt unverzichtbar. Sie schneidet Vollmaterial, Rohre, Profile und Stangen mit hoher Präzision und wirtschaftlichem Sägeblattverbrauch. Doch nicht jede Bandsäge passt zu jedem Betrieb. Wir geben Ihnen einen strukturierten Überblick.

## Die drei Haupttypen

### Manuelle Metallbandsägen

Bei manuellen Maschinen wird der Sägebogen per Hand oder einfachem Gewicht auf das Werkstück abgesenkt. Der Vorschub ist manuell gesteuert. Diese Maschinen sind günstig in der Anschaffung, robust und für gelegentlichen Einsatz ideal.

**Vorteile:** Niedrige Anschaffungskosten, einfache Bedienung, geringer Platzbedarf
**Nachteile:** Kein automatischer Ablauf, Bediener muss während des Schnitts anwesend sein
**Typische Einsatzgebiete:** Kleine Werkstätten, Schlossereien, gelegentliches Sägen

### Halbautomatische Bandsägen

Halbautomatische Maschinen verfügen über einen motorisierten, druckgeregelten Vorschub. Der Schnittdruck wird konstant gehalten, was längere Sägeblattlaufzeiten und bessere Schnittqualität ergibt. Nach dem Schnitt fährt der Sägebogen automatisch hoch.

**Vorteile:** Konstante Schnittqualität, Entlastung des Bedieners, wirtschaftlicher Blattverbrauch
**Nachteile:** Teurer als manuelle Maschinen, Materialzufuhr noch manuell
**Typische Einsatzgebiete:** Lohnzuschnitt, mittlere Betriebe, regelmäßiger Einsatz

### Vollautomatische Bandsägeautomaten

Vollautomaten verfügen über eine automatische Stangenzufuhr, programmierbare Schnittlängen und können unbeaufsichtigt Serien sägen. Hochwertige Modelle arbeiten mit CNC-Steuerung, integrierter Messung und automatischer Schnittvermessung.

**Vorteile:** Vollautomatischer Ablauf, hohe Produktivität, Serienfertigung möglich
**Nachteile:** Hohe Anschaffungskosten, größerer Platzbedarf, komplexere Wartung
**Typische Einsatzgebiete:** Stahlhandel, Lohnzuschnittzentren, Großbetriebe

## Wichtige technische Parameter

Achten Sie beim Kauf auf folgende Kenngrößen:

- **Schnittbereich (Rund-/Rechteckkapazität):** Bestimmt den maximalen Materialdurchmesser
- **Bandgeschwindigkeit (m/min):** Anpassbar an verschiedene Werkstoffe
- **Sägebandmaße:** Breite × Stärke × Länge – beeinflusst Blattauswahl
- **Vorspanung:** Wichtig für Schnittgenauigkeit bei harten Materialien
- **Kühlmittelanlage:** Pflicht bei Metall – verlängert Blattstandzeit erheblich

## Die richtige Blattauswahl

Das Sägeblatt entscheidet mehr als die Maschine selbst über Schnittqualität und Wirtschaftlichkeit.

| Material | Empfohlene Zahnteilung (TPI) | Blatttyp |
|---|---|---|
| Vollstahl (Ø bis 50 mm) | 10–14 TPI | Bi-Metall |
| Vollstahl (Ø 50–150 mm) | 6–10 TPI | Bi-Metall |
| Dünnwandige Rohre | 14–18 TPI | Bi-Metall |
| Aluminium, Buntmetalle | 4–6 TPI | Bi-Metall oder Hartmetall |
| Edelstahl | 5–8 TPI | Bi-Metall (spezial) |

**Grundregel:** Je dünner das Material, desto feiner die Verzahnung. Zu grobe Verzahnung bei dünnwandigen Teilen führt zu Ausrissen; zu feine Verzahnung bei Massivstahl verstopft schnell.

## Bekannte Hersteller im Überblick

- **Behringer (Deutschland):** Sehr hochwertige Automaten und Halbautomaten, langlebig, gute Ersatzteilversorgung
- **Kasto (Deutschland):** Führend bei Hochleistungsautomaten und Lagersystemen
- **MEP (Italien):** Gutes Preis-Leistungs-Verhältnis, weit verbreitet
- **Bianco (Italien):** Robuste Einstiegsmaschinen bis hin zur Mittelklasse
- **DoAll (USA):** Klassiker, auch gebraucht gut verfügbar
- **Bomar (Tschechien):** Preiswerte Alternative mit guter Qualität

## Gebraucht kaufen: Worauf achten?

Bandsägen sind solide Maschinen – gut gewartet laufen sie Jahrzehnte. Beim Gebrauchtkauf sollten Sie prüfen:

1. **Führungsrollen:** Auf Verschleiß und Leichtgängigkeit prüfen
2. **Schwungrollen:** Kein Schlag, keine Risse
3. **Sägebandführungen:** Karbidblöcke oder Kugellager – noch in Ordnung?
4. **Druckregelventil beim Vorschub:** Funktion testen
5. **Kühlmittelanlage:** Auf Dichtigkeit und Funktion testen
6. **Schutzhaube und Sicherheitsschalter:** Vollständigkeit und Funktion prüfen

---

Wir haben regelmäßig Metallbandsägen aller Bauformen – manuell, halbautomatisch und automatisch – im Lager. Sprechen Sie uns an für aktuelle Verfügbarkeit und Preise.
  $md$,
  'https://images.unsplash.com/photo-1711418235334-8895331a6cf9?w=1200&auto=format&fit=crop&q=80',
  'Technik',
  'Metallbandsägen – manuell, halbautomatisch oder Automat? | Firmenberatung Kassel',
  'Metallbandsäge kaufen: Wir erklären die Unterschiede zwischen manuellen, halbautomatischen und vollautomatischen Bandsägeautomaten und geben Tipps zur Blattauswahl.',
  true
);

-- Artikel 7: Schleifmaschinen
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'schleifmaschinen-ueberblick-metallbearbeitung',
  'Schleifmaschinen für die Metallbearbeitung – Flach-, Rund- und Profilschleifen erklärt',
  'Schleifmaschinen sind die Präzisionswerkzeuge der Metallbearbeitung. Wir erklären die verschiedenen Bauformen – vom Flachschleifer bis zur CNC-Schleifmaschine – und ihre typischen Einsatzbereiche.',
  $md$
# Schleifmaschinen für die Metallbearbeitung – Flach-, Rund- und Profilschleifen erklärt

In der Präzisionsfertigung sind Schleifmaschinen oft der letzte und entscheidende Bearbeitungsschritt. Wo Drehen und Fräsen an ihre Grenzen kommen – ob bei Oberflächengüten im Ra-Bereich unter 0,4 μm oder Maßtoleranzen im Bereich weniger Mikrometer – übernimmt die Schleifmaschine.

## Warum schleifen statt fräsen?

Schleifen ist kein Ersatz für Fräsen oder Drehen – es ist deren konsequente Weiterführung. Typische Gründe für den Einsatz von Schleifmaschinen:

- **Oberflächengüte:** Schleifen erzielt Ra-Werte unter 0,1 μm – Fräsen kommt selten unter Ra 0,4 μm
- **Maßgenauigkeit:** Toleranzen von IT5 bis IT7 sind beim Schleifen Standard
- **Gehärtete Werkstoffe:** Nach dem Härten lassen sich Stähle nicht mehr sinnvoll drehen oder fräsen – Schleifen ist die einzige wirtschaftliche Option
- **Spanlose Endbearbeitung:** Minimale Wärmeeinleitung, keine Gratbildung

## Die wichtigsten Schleifmaschinenbauformen

### Flachschleifmaschinen

Die Flachschleifmaschine erzeugt ebene Flächen mit hoher Parallelität und Ebenheit. Das Werkstück wird auf einem Magnetspanntisch eingespannt und unter der rotierenden Schleifscheibe hindurch verfahren.

**Typische Anwendungen:** Planflächen an Werkzeugteilen, Lehren, Formplatten, Passteile
**Typische Hersteller:** Blohm, Jung, Kaindl, Okamoto, Chevalier
**Erreichbare Genauigkeit:** Ebenheit 0,002–0,005 mm/300 mm, Ra 0,1–0,4 μm

### Außenrundschleifmaschinen

Das Werkstück rotiert zwischen zwei Spitzen oder eingespannt in einer Aufnahme, die Schleifscheibe arbeitet von außen. Geeignet für Wellen, Bolzen, Zylinder und ähnliche rotationssymmetrische Teile.

**Bauformen:**
- **Längsschliff:** Scheibe läuft über die gesamte Länge des Werkstücks
- **Einstechschliff:** Scheibe fährt nur radial ein – ideal für kurze, profilierte Abschnitte

**Typische Hersteller:** Studer, Schaudt, Kellenberger, Voumard

### Innenrundschleifmaschinen

Das Gegenstück zur Außenrundschleifmaschine – die Schleifspindel arbeitet im Inneren einer Bohrung oder Hülse. Die Spindeldrehzahlen sind hier oft sehr hoch (bis 100.000 min⁻¹), da der Schleifstift sehr klein sein muss.

**Typische Anwendungen:** Bohrungen in Werkzeugträgern, Büchsen, Zylinderlaufbuchsen
**Erreichbare Genauigkeit:** Zylinderform unter 0,003 mm, Ra unter 0,2 μm

### Profilschleifmaschinen

Profilschleifmaschinen erzeugen nach einer vorgegebenen Kontur geschliffene Flächen – häufig an Werkzeugschneideinsätzen, Stempeln und Matrizen. Moderne CNC-Profilschleifmaschinen arbeiten mit abgerichteten Profilscheiben oder durch koordiniertes Abfahren der Kontur.

**Typische Hersteller:** Blohm Profimat, Mägerle, Studer S

### Werkzeugschleifmaschinen

Zum Nachschleifen von Fräsern, Bohrern, Stufenbohrern und Sonderwerkzeugen. Im Werkzeugbau unverzichtbar.

**Typische Hersteller:** Walter, Vollmer, Anca, Deckel SO

## Schleifscheiben – die unterschätzte Variable

Die Schleifscheibe ist kein Verbrauchsmaterial – sie ist ein Werkzeug, das genau auf Werkstoff und Anforderung abgestimmt sein muss.

| Parameter | Bedeutung |
|---|---|
| Schleifkorn | Korund (A), Siliziumkarbid (C), CBN (B), Diamant (D) |
| Körnung | Grob (46–60) für schnelles Abtragen, fein (120–220) für Feinschliff |
| Bindung | Keramisch (V) – standard; Kunstharz (B) – flexibler; galvanisch – für CBN/Diamant |
| Härte | A–Z: weicher Bindungsgrad für harte Werkstoffe, harter Bindungsgrad für weiche |

## Neu oder gebraucht kaufen?

Schleifmaschinen sind konservative Maschinen – mechanisch schlicht, präzisionsgefertigt und langlebig. Eine gut gewartete Flachschleifmaschine von Blohm oder Jung kann auch nach 30 Jahren noch Toleranzen im Mikrometerbereich halten.

**Worauf Sie beim Gebrauchtkauf achten sollten:**
- Geometrieprüfung: Tischparallelität, Spindelschlag messen lassen
- Magnetspanntisch: Auf Risse und gleichmäßige Haltekraft prüfen
- Schleifsupport: Zustand der Vertikalführung, Spiel prüfen
- Kühlmittelanlage: Vollständigkeit und Dichtigkeit

---

Flach- und Rundschleifmaschinen sind ein Kernsegment unseres Sortiments. Wir führen regelmäßig Maschinen von Blohm, Jung, Studer und anderen Premiumherstellern – sprechen Sie uns an.
  $md$,
  'https://images.unsplash.com/photo-1685713011172-3ba27ff25e22?w=1200&auto=format&fit=crop&q=80',
  'Technik',
  'Schleifmaschinen – Flach-, Rund- und Profilschleifen erklärt | Firmenberatung Kassel',
  'Schleifmaschinen für die Metallbearbeitung: Wir erklären Flachschleifen, Außen- und Innenrundschleifen, Profilschleifen und geben Tipps zum Gebrauchtkauf.',
  true
);

-- Artikel 8: Blechbearbeitung
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'blechbearbeitung-abkantpressen-scheren-stanzmaschinen',
  'Blechbearbeitung verstehen: Abkantpressen, Scheren und Stanzmaschinen im Überblick',
  'Wer Blech biegt, schneidet oder stanzt, braucht die richtige Maschine. Wir erklären die wichtigsten Maschinentypen der Blechbearbeitung und worauf es beim Kauf ankommt.',
  $md$
# Blechbearbeitung verstehen: Abkantpressen, Scheren und Stanzmaschinen im Überblick

Die Blechbearbeitung ist ein eigenständiges und vielschichtiges Gebiet der Metallverarbeitung. Ob Fassadenbau, Fahrzeugbau, Heizungs- und Lüftungstechnik oder Maschinenbau – überall werden Bleche gebogen, geschnitten und gestanzt. Wir geben Ihnen einen strukturierten Überblick über die wichtigsten Maschinentypen.

## Abkantpressen – das Herzstück der Blechbiegerei

### Was ist eine Abkantpresse?

Eine Abkantpresse (auch: Gesenkbiegemaschine oder Kantpresse) biegt Bleche durch den koordinierten Einsatz von Ober- und Unterwerkzeug. Das Oberwerkzeug (Stempel) drückt das Blech in das Unterwerkzeug (Matrize) und erzeugt so einen präzisen Biegewinkel.

### Mechanisch vs. hydraulisch

**Mechanische Abkantpressen** arbeiten mit Exzenter- oder Kurbelantrieb. Sie sind schnell, aber der Pressweg ist fest definiert – Flexibilität beim Werkzeugwechsel ist eingeschränkt. Heute kaum noch im Neubau.

**Hydraulische Abkantpressen** sind der Standard: Zwei synchronisierte Hydraulikzylinder treiben den Pressbalken. Der Hub ist frei einstellbar, die Kraft über den gesamten Hub konstant. Ideal für wechselnde Biegeteile.

**CNC-Abkantpressen** verfügen über vollautomatische Hinteranschlag-Positionierung, automatische Bombierung des Pressbalkens und programmierbare Abläufe. Für Serienfertigung unverzichtbar.

### Wichtige Kenngrößen

- **Biegelänge (mm):** Maximale Länge des Werkstücks
- **Presskraft (kN oder Tonnen):** Beeinflusst die maximale Blechdicke
- **Durchbiegungs-Kompensation (Bombierung):** Wichtig für gleichmäßige Winkel über die gesamte Länge
- **Hinteranschlag:** CNC-gesteuert für genaue Schenkellängen

**Typische Hersteller:** Trumpf, Amada, Bystronic, Haco, Durma, LVD, Safan

## Tafelscheren – präzises Blechschneiden

### Guillotinescheren (Tafelscheren)

Die Guillotineschere schneidet Bleche durch eine geradlinige Bewegung des Obermessers. Sie ist das schnellste Werkzeug für gerade Schnitte in großen Blechformaten.

**Bauformen:**
- **Schwenkbalken-Schere:** Obermesser schwenkt – günstig, für dünnere Bleche
- **Parallelschere (hydraulisch):** Obermesser fährt parallel zum Untermesser ab – präzisere Schnitte, für dickere Bleche geeignet

**Wichtige Kenngrößen:**
- Schneidlänge (mm)
- Maximale Blechdicke (mm) bei einer definierten Zugfestigkeit
- Schnittwinkel (Rake-Winkel) – beeinflusst Verformung der Schnittkante

**Typische Hersteller:** Trumpf, Amada, Durma, Haco, Schröder

## Stanzmaschinen

### Exzenterstanzmaschinen

In der Blechbearbeitung werden Exzenterstanzmaschinen für das Ausstanzen von Löchern, Ausschnitten und Konturen eingesetzt. Hohe Hubfrequenz, kurze Taktzeiten.

### CNC-Nibbelmaschinen und Stanz-Laser-Kombimaschinen

Moderne CNC-Nibbelmaschinen arbeiten nach einem Koordinatensystem: Das Blech wird unter dem Stanzwerkzeug in X- und Y-Richtung verfahren. So lassen sich beliebige Konturen und Lochbilder stanzen.

**Stanz-Laser-Kombimaschinen** (z. B. Trumpf TruPunch, Amada Pulsar) kombinieren Stanzen und Laserschneiden in einer Maschine – maximale Flexibilität.

## Welche Maschine für welchen Betrieb?

| Betriebstyp | Empfohlene Maschinen |
|---|---|
| Schlosserei / Einzelteile | Manuelle Abkantpresse + Schwenkschere |
| Lohnfertiger / kleine Serien | Hydraulische CNC-Abkantpresse + Guillotineschere |
| Serienproduktion | CNC-Abkantpresse + CNC-Stanzmaschine |
| Individualteilfertigung | CNC-Abkantpresse + Stanz-Laser-Kombination |

## Gebrauchte Blechbearbeitungsmaschinen kaufen

Abkantpressen und Scheren sind robuste Maschinen, die bei guter Wartung jahrzehntelang präzise arbeiten. Beim Gebrauchtkauf beachten:

- **Messerhalter und Messer** auf Verschleiß und korrekte Einstellung prüfen
- **Hinteranschlag-Präzision** messen: Wiederholgenauigkeit unter 0,1 mm?
- **Hydraulikanlage:** Auf Leckagen und gleichmäßigen Druck prüfen
- **Steuerung:** Verfügbarkeit von Ersatzteilen und Updates klären
- **Probelauf mit Testteil** immer verlangen

---

Abkantpressen, Scheren und Stanzmaschinen sind ein fester Bestandteil unseres Sortiments. Wir haben regelmäßig Maschinen von Trumpf, Amada, Haco und weiteren Herstellern verfügbar – fragen Sie uns nach aktuellem Bestand.
  $md$,
  'https://images.unsplash.com/photo-1713371398484-cc4e4f6a262a?w=1200&auto=format&fit=crop&q=80',
  'Technik',
  'Blechbearbeitung: Abkantpressen, Scheren und Stanzmaschinen erklärt | Firmenberatung Kassel',
  'Abkantpresse, Tafelschere oder Stanzmaschine? Wir erklären die wichtigsten Maschinentypen der Blechbearbeitung und geben Tipps für den Kauf neuer und gebrauchter Maschinen.',
  true
);

-- Artikel 9: Maschinenfinanzierung
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'maschinenfinanzierung-leasing-kauf-mietkauf',
  'Maschinenfinanzierung: Kauf, Leasing oder Mietkauf – Was ist für Ihren Betrieb das Richtige?',
  'Eine Werkzeugmaschine zu finanzieren, ist oft eine komplexe Entscheidung. Wir erklären die gängigsten Finanzierungsmodelle und helfen Ihnen, die richtige Wahl für Ihren Betrieb zu treffen.',
  $md$
# Maschinenfinanzierung: Kauf, Leasing oder Mietkauf – Was ist für Ihren Betrieb das Richtige?

Werkzeugmaschinen sind Investitionsgüter – und Investitionen müssen finanziert werden. Ob Eigenkapital, Bankkredit, Leasing oder Mietkauf: Jedes Modell hat seine Berechtigung, seine steuerlichen Auswirkungen und seine typischen Einsatzbereiche. Wir geben Ihnen einen praxisorientierten Überblick.

## Modell 1: Direktkauf (Eigenkapital oder Kredit)

### Kauf aus Eigenkapital

Die einfachste Form der Finanzierung: Sie bezahlen die Maschine vollständig aus Eigenmitteln. Keine Zinsen, keine Vertragsbindung, volle Dispositionsfreiheit.

**Vorteile:**
- Kein Zinsaufwand
- Volle Eigentümerschaft sofort
- Keine vertraglichen Einschränkungen (z. B. bei Umbauten, Weiterverkauf)

**Nachteile:**
- Bindet Liquidität
- Entgangene Verzinsung des eingesetzten Kapitals

**Empfehlung:** Sinnvoll für kleinere Maschinen (unter 15.000 €) oder Betriebe mit hoher Liquiditätsreserve.

### Investitionskredit / Maschinenkredit

Die Bank finanziert den Kaufpreis, Sie werden sofort Eigentümer. Tilgung erfolgt in monatlichen Raten.

**Vorteile:**
- Sofortige Eigentümerschaft und Abschreibungsmöglichkeit
- Zinsen steuerlich absetzbar
- Maschine kann jederzeit verkauft werden

**Nachteile:**
- Abhängig von Bonität und Sicherheiten
- Zinslast über die Laufzeit

## Modell 2: Leasing

Beim Leasing bleibt die Maschine Eigentum der Leasinggesellschaft. Sie zahlen eine monatliche Leasingrate und nutzen die Maschine für die vereinbarte Laufzeit.

### Vorteile des Leasings

- **Bilanzneutral (Operating Lease):** Bei bestimmten Vertragsgestaltungen erscheint die Maschine nicht in der Bilanz – was Kennzahlen wie die Eigenkapitalquote verbessert
- **Planbare Raten:** Feste monatliche Kosten, keine Überraschungen
- **Steuerliche Wirkung:** Leasingraten sind vollständig als Betriebsausgaben absetzbar
- **Technologieflexibilität:** Am Ende der Laufzeit kann neuere Technik geleast werden

### Nachteile des Leasings

- **Kein Eigentum:** Sie bauen kein Anlagevermögen auf
- **Gesamtkosten höher:** Über die Laufzeit zahlen Sie mehr als beim Direktkauf
- **Einschränkungen:** Umbau oder Veränderungen an der Maschine oft vertraglich untersagt
- **Vorzeitige Kündigung teuer:** Leasingverträge sind meist schwer kündbar

**Typische Laufzeit:** 36–72 Monate
**Typische Anzahlung:** 0–20 % des Kaufpreises

## Modell 3: Mietkauf

Der Mietkauf ist ein Hybrid: Sie zahlen monatliche Raten wie beim Leasing, werden am Ende der Laufzeit jedoch automatisch Eigentümer der Maschine – ohne weitere Restzahlung.

**Vorteile:**
- Eigentümerschaft nach Laufzeitende inklusive
- Steuerlich attraktiv: anteilige Abschreibung möglich
- Planbare Kosten wie beim Leasing

**Nachteile:**
- Erscheint in der Bilanz (da Eigentumserwerb vereinbart)
- Etwas höhere Monatrate als Leasing

**Empfehlung:** Ideal für Maschinen, die dauerhaft genutzt werden sollen (Kernmaschinenpark), wenn keine hohe Liquidität vorhanden ist.

## Steuerliche Aspekte im Vergleich

| Modell | Bilanzierung | Steuerliche Wirkung | Abschreibung |
|---|---|---|---|
| Kauf (Eigenkapital) | Aktivierung | Abschreibung über Nutzungsdauer | 6–12 Jahre (typisch) |
| Kredit | Aktivierung + Verbindlichkeit | Zinsen absetzbar, Abschreibung | 6–12 Jahre |
| Leasing (Operating) | Außerbilanziell | Rate vollständig absetzbar | Keine |
| Mietkauf | Aktivierung | Anteilig absetzbar | 6–12 Jahre |

*Hinweis: Steuerliche Details immer mit Ihrem Steuerberater klären – die Gestaltung im Einzelfall ist entscheidend.*

## Besonderheit: Gebrauchtmaschinen und Finanzierung

Auch gebrauchte Maschinen lassen sich finanzieren – viele Banken und Leasinggesellschaften bieten Finanzierungen für Gebrauchtinvestitionen an, sofern der Maschinenwert nachgewiesen ist. Wichtig: Bei gebrauchten Maschinen sind die Laufzeiten meist kürzer (24–48 Monate) und die Restwertschätzung sorgfältig zu wählen.

## Unser Rat: Das richtige Modell für Ihre Situation

- **Hohe Liquidität, langfristige Nutzung:** Kauf aus Eigenkapital oder Kredit
- **Liquidität schonen, technologieoffen bleiben:** Leasing
- **Langfristig planen, Eigentum aufbauen:** Mietkauf
- **Kleines Unternehmen, erster Einstieg:** Kredit oder Mietkauf

---

Wenn Sie eine Maschine bei uns kaufen und eine Finanzierungslösung benötigen, helfen wir Ihnen gerne, die richtigen Ansprechpartner zu finden. Sprechen Sie uns an.
  $md$,
  'https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?w=1200&auto=format&fit=crop&q=80',
  'Ratgeber',
  'Maschinenfinanzierung: Leasing, Kauf oder Mietkauf? | Firmenberatung Kassel',
  'Wie finanziere ich eine Werkzeugmaschine? Wir erklären die Vor- und Nachteile von Direktkauf, Leasing und Mietkauf – mit steuerlichen Hinweisen für Ihren Betrieb.',
  true
);

-- Artikel 10: CNC-Bearbeitungszentren
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'cnc-bearbeitungszentren-3-4-5-achse-erklaert',
  'CNC-Bearbeitungszentren: 3-, 4- und 5-Achs-Maschinen – Unterschiede und Anwendungen',
  'Was ist der Unterschied zwischen einem 3-Achser und einem 5-Achser? Und wann lohnt sich der Aufwand einer Simultanbearbeitung? Wir erklären die Welt der CNC-Bearbeitungszentren.',
  $md$
# CNC-Bearbeitungszentren: 3-, 4- und 5-Achs-Maschinen – Unterschiede und Anwendungen

Das CNC-Bearbeitungszentrum (BAZ) ist die Königsklasse der spanenden Fertigung. Es kombiniert Fräsen, Bohren, Gewindeschneiden und oft weitere Operationen in einer Maschine – und kann mit mehreren Achsen selbst komplexeste Konturen in einer einzigen Aufspannung fertigen. Doch was genau unterscheidet einen 3-Achser von einem 5-Achser?

## Grundbegriffe: Was sind Achsen?

Eine Achse entspricht einer möglichen Bewegungsrichtung. Im Koordinatensystem der Zerspannung unterscheidet man:

- **Lineare Achsen:** X (links-rechts), Y (vor-zurück), Z (auf-ab)
- **Rotatorische Achsen:** A (Rotation um X), B (Rotation um Y), C (Rotation um Z)

Ein 3-Achser bewegt Werkzeug und/oder Tisch in X, Y, Z. Ein 5-Achser addiert zwei Rotationsachsen – etwa A und C oder B und C.

## 3-Achs-Bearbeitungszentren

Das 3-Achs-BAZ ist das am weitesten verbreitete Bearbeitungszentrum. Werkzeug und Tisch bewegen sich in drei Linearachsen. Die Bearbeitung erfolgt stets von oben oder von der Seite – das Werkstück muss für jede neue Bearbeitungsseite umgespannt werden.

**Vorteile:**
- Günstigster Einstieg in die BAZ-Technologie
- Einfache Programmierung (G-Code, CAM)
- Weites Angebot an neuen und gebrauchten Maschinen
- Ausreichend für die meisten prismatischen Teile

**Typische Anwendungen:** Gehäuse, Flansche, Platten, einfache Formen
**Typische Hersteller:** Haas, Deckel-Maho DMU 50, Mazak, Chiron, Grob

## 4-Achs-Bearbeitungszentren

Ein 4-Achser addiert eine Rotationsachse zum 3-Achser – meist eine Drehtisch- oder Schwenkachse (A oder B). Diese kann als Indexierachse (schrittweise Positionierung) oder als echte Simultanachse betrieben werden.

**Indexierend:** Der Tisch dreht das Werkstück in eine neue Position, dann wird konventionell mit 3 Achsen gefräst. Ermöglicht die Bearbeitung von vier oder mehr Seiten ohne Umspannen.

**Simultan:** Alle 4 Achsen fahren gleichzeitig – ermöglicht einfache Schraubenlinien, Nockenkonturen und schräge Flächen.

**Typische Anwendungen:** Mehrseitige Gehäuseteile, rotierende Teile mit radialen Bohrungen
**Vorteil gegenüber 3-Achser:** Weniger Umspannungen, höhere Genauigkeit durch konsistente Referenz

## 5-Achs-Bearbeitungszentren

Das 5-Achs-BAZ ist die vollständige Lösung: Fünf Achsen ermöglichen, das Werkzeug in jede erdenkliche Winkelstellung zum Werkstück zu fahren. Die Bearbeitung komplexer Freiformflächen, tiefer Taschen und hinterschnittener Konturen wird erst durch die 5-Achs-Simultanbearbeitung wirtschaftlich möglich.

**Bauformen:**
- **Schwenktisch-Konstruktion (A+C oder B+C):** Tisch kann kippen und drehen. Vorteil: große Teile durch schwenkbaren Tisch bearbeitbar. Nachteil: Werkstückgewicht begrenzt.
- **Schwenkkopf-Konstruktion (A+B im Fräskopf):** Der Fräskopf selbst schwenkt. Vorteil: großes, schweres Werkstück kann fest liegen. Nachteil: komplexer Aufbau.
- **Fork-Head / Trunnion-Kombination:** Kombiniert beide Prinzipien.

**Vorteile der 5-Achsbearbeitung:**
- Komplexe Geometrien in einer Aufspannung
- Optimaler Werkzeugangriff: geringerer Werkzeugverschleiß
- Kürzere Werkzeuge möglich: weniger Vibrationen, höhere Präzision
- Drastische Reduzierung der Aufspannungen

**Nachteile:**
- Hohe Anschaffungskosten (250.000 – 1.500.000 €)
- Komplexe CAM-Programmierung erforderlich
- Aufwendigere Einrichtung und Wartung

**Typische Anwendungen:** Turbinenschaufeln, Formen und Gesenke, Prototypenteile, medizinische Implantate, Luft- und Raumfahrtkomponenten
**Typische Hersteller:** Hermle C650, DMG Mori DMU 50, Makino D200, Chiron FZ 12

## Wann lohnt welche Lösung?

| Betriebsprofil | Empfehlung |
|---|---|
| Einzel- und Kleinserienfertigung einfacher Teile | 3-Achs-BAZ |
| Mehrseitige prismatische Teile, kleine bis mittlere Serien | 4-Achs-BAZ |
| Komplexe Freiformteile, Formen- und Gesenke | 5-Achs-BAZ |
| Gemischte Fertigung (Einzel + Serie) | 3+1 oder flexibles 5-Achs-BAZ |

## Gebrauchte BAZ kaufen – was beachten?

5-Achs-Maschinen gebraucht zu kaufen kann erheblich Geld sparen – ein gebrauchtes Hermle C400 mit 20.000 Betriebsstunden kostet 80.000–120.000 Euro statt 350.000 Euro neu.

**Wichtige Prüfpunkte:**
- Steuerungsversion: Heidenhain TNC 530/640, Siemens 840D – sind Zyklen und Software aktuell?
- Messung der Schwenkpräzision: Schwenkachsen müssen auf unter 0,005 mm genau sein
- Geometriemessung: Geradheit, Rechtwinkligkeit, Positioniergenauigkeit mit Laserinterferometer
- Spindelzustand: Schlag, Lärm, Lager – bei hochwertigen Spindeln teuer im Tausch

---

Wir haben regelmäßig CNC-Bearbeitungszentren von 3- bis 5-Achs-Ausführung im Bestand – von kompakten Einsteiger-BAZ bis hin zu leistungsfähigen 5-Achsern. Sprechen Sie uns an.
  $md$,
  'https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=1200&auto=format&fit=crop&q=80',
  'Technik',
  'CNC-Bearbeitungszentren: 3-, 4- und 5-Achse erklärt | Firmenberatung Kassel',
  'Was ist der Unterschied zwischen 3-Achs- und 5-Achs-Bearbeitungszentren? Wir erklären die Bauformen, Anwendungen und geben Tipps für den Gebrauchtkauf.',
  true
);

-- Artikel 11: Markenmaschinen aus Deutschland
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'werkzeugmaschinen-made-in-germany-qualitaet',
  'Made in Germany – Warum Herkunft beim Kauf von Werkzeugmaschinen eine Rolle spielt',
  'Deutsche, österreichische und Schweizer Werkzeugmaschinen genießen weltweit einen ausgezeichneten Ruf. Doch lohnt sich der Mehrpreis gegenüber asiatischen Fabrikaten wirklich? Ein ehrlicher Vergleich.',
  $md$
# Made in Germany – Warum Herkunft beim Kauf von Werkzeugmaschinen eine Rolle spielt

"Made in Germany" ist in der Maschinenbaubranche kein leeres Marketingversprechen – es steht für Präzision, Langlebigkeit und verlässliche Ersatzteilversorgung. Doch die Welt hat sich verändert. Japanische, südkoreanische und inzwischen auch chinesische Hersteller liefern Maschinen, die technisch mithalten können. Wir analysieren nüchtern, wann die Herkunft entscheidend ist – und wann nicht.

## Was steckt hinter "Made in Germany"?

### Die historische Stärke

Deutschland, Österreich und die Schweiz sind seit dem 19. Jahrhundert Heimat einiger der bedeutendsten Werkzeugmaschinenhersteller der Welt. Namen wie Trumpf, Hermle, Chiron, Deckel-Maho, Gildemeister (DMG), Schütte, Index, Hahn & Kolb oder Index stehen für Generationen von Präzisionsarbeit.

**Typische Stärken deutschsprachiger Hersteller:**
- Hochwertige Gusskonstruktionen (Mineralguss, Hartguss)
- Langerprobte Spindeltechnologie
- Exzellente Service- und Ersatzteilversorgung (auch für 20–30 Jahre alte Maschinen)
- Enge Zusammenarbeit mit Steuerungsherstellern (Siemens, Heidenhain)
- Präzise Geometrie ab Werk, selten Nacharbeit erforderlich

### Was kostet "Made in Germany"?

Ein Vergleich macht deutlich: Eine deutsche CNC-Drehmaschine kostet in der Regel 20–60 % mehr als ein vergleichbares asiatisches Modell. Bei 5-Achs-Bearbeitungszentren kann der Aufpreis noch höher sein.

## Japanische Hersteller – starke Alternative

Japan hat mit Mazak, Fanuc, Okuma, Mori Seiki und Makino eine eigene Hochleistungsklasse aufgebaut, die international konkurrenzfähig ist. Japanische Maschinen sind für ihre Zuverlässigkeit, ihre hochwertigen Spindeln und ihre ausgefeilten Steuerungskonzepte bekannt.

**Besonderheit:** Japanische Hersteller haben den Maschinenmarkt oft durch Innovation geprägt – insbesondere bei schnellen Bearbeitungszentren und Schleifmaschinen.

## Südkoreanische Hersteller – gutes Preis-Leistungs-Verhältnis

Doosan, Hyundai-WIA und DN Solutions haben sich in den letzten zwei Jahrzehnten als ernstzunehmende Alternative etabliert. Qualität und Präzision sind auf einem guten Niveau, der Preis liegt 15–30 % unter vergleichbaren europäischen Modellen.

**Typisch:** Gute Grundmaschinen, solide Steuerung (oft Fanuc oder Siemens), akzeptabler Service.

## Chinesische Hersteller – zwischen Einstieg und Aufholjagd

Der chinesische Werkzeugmaschinenbau hat enorme Fortschritte gemacht. Hersteller wie Haitian, SMTCL oder DMTG bauen heute Maschinen, die für Standardanwendungen vollständig ausreichend sind.

**Stärken:** Sehr niedrige Anschaffungskosten, einfache Standardmaschinen
**Schwächen:** Servicequalität variiert stark, Ersatzteilversorgung für ältere Modelle oft unklar, Qualität bei Sonderanforderungen und Präzisionstoleranzen oft noch hinter Europa/Japan

## Wann lohnt sich der Mehrpreis?

**"Made in Germany" lohnt sich besonders wenn...**
- hohe Präzision und enge Toleranzen gefragt sind
- die Maschine über 15–20 Jahre genutzt werden soll
- ein lokaler Service und schnelle Ersatzteilversorgung kritisch sind
- Maschinen für zertifizierte Fertigungsprozesse (Luft-/Raumfahrt, Medizintechnik) benötigt werden

**Eine günstigere Alternative kann sinnvoll sein wenn...**
- Standardbearbeitung ohne extreme Präzisionsanforderungen
- Die Maschine nach 5–7 Jahren ersetzt werden soll
- Ein geringes Budget zur Verfügung steht
- Es sich um Nebenmaschinen oder Schrupp-Operationen handelt

## Gebrauchte deutsche Maschinen als Investition

Hier liegt vielleicht das stärkste Argument für "Made in Germany": Eine 15 Jahre alte Hermle, Trumpf oder Deckel-Maho arbeitet heute noch so präzise wie am ersten Tag – vorausgesetzt, sie wurde ordentlich gewartet. Und für viele Modelle sind Ersatzteile noch jahrzehntelang verfügbar.

Eine gut erhaltene gebrauchte deutsche Maschine kann das beste aus beiden Welten bieten: Erstklassige Qualität und Langlebigkeit zum Preis einer mittelmäßigen Neumaschine.

---

Unser Lager in Kaufungen umfasst regelmäßig Maschinen aus deutschem, österreichischem und internationalem Qualitätsmaschinenbau. Fragen Sie uns – wir helfen Ihnen, die richtige Entscheidung zu treffen.
  $md$,
  'https://images.unsplash.com/photo-1714504904786-b6732390b206?w=1200&auto=format&fit=crop&q=80',
  'Ratgeber',
  'Made in Germany – Lohnt sich der Mehrpreis bei Werkzeugmaschinen? | Firmenberatung Kassel',
  'Werkzeugmaschinen aus Deutschland vs. Asien: Wir vergleichen Qualität, Langlebigkeit und Kosten ehrlich und zeigen, wann sich der Mehrpreis für Made in Germany wirklich lohnt.',
  true
);

-- Artikel 12: Hydraulikpresse vs. Exzenterpresse
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'hydraulikpresse-vs-exzenterpresse-vergleich',
  'Hydraulikpresse oder Exzenterpresse – Welche Presse passt zu Ihrer Fertigung?',
  'Exzenterpresse oder Hydraulikpresse? Beide haben ihre Stärken. Wir erklären die Funktionsprinzipien, typische Anwendungsgebiete und helfen Ihnen, die richtige Wahl zu treffen.',
  $md$
# Hydraulikpresse oder Exzenterpresse – Welche Presse passt zu Ihrer Fertigung?

Pressen sind universelle Werkzeuge der Metallbearbeitung – eingesetzt beim Stanzen, Tiefziehen, Biegen, Fügen und Kalibrieren. Doch die Wahl zwischen einer mechanischen Exzenterpresse und einer hydraulischen Presse ist keine Kleinigkeit: Kraft, Geschwindigkeit, Flexibilität und Wirtschaftlichkeit unterscheiden sich erheblich.

## Das Funktionsprinzip der Exzenterpresse

Die Exzenterpresse (auch: Kurbelstangenpresse, Spindelpresse mit Kurbel) überträgt die Kraft eines Elektromotors über eine Kurbelwelle und Exzenterscheibe auf den Pressenstößel. Die Bewegung ist sinusförmig – der Stößel fährt in einem festen Hubmuster, und die übertragbare Kraft ist am Totpunkt (unterster Punkt) am größten.

### Stärken der Exzenterpresse

- **Hohe Hubfrequenz:** 40–300 Hübe pro Minute – ideal für schnelle Stanzoperationen
- **Konstante Taktzeit:** Durch das feste Hubmuster gleichmäßige und vorhersagbare Produktion
- **Robuster Aufbau:** Wenige bewegliche Teile, lange Lebensdauer
- **Niedrige Betriebskosten:** Kaum Verschleiß, kein Hydraulikflüssigkeitswechsel

### Grenzen der Exzenterpresse

- **Fester Hub:** Die Hubgröße ist festgelegt – nur begrenzt anpassbar
- **Kraft nicht über gesamten Hub konstant:** Maximalkraft nur am Totpunkt
- **Keine Kraft-Weg-Steuerung:** Keine Möglichkeit, den Kraft-Weg-Verlauf zu programmieren
- **Weniger flexibel bei Werkzeugwechsel:** Umrüsten dauert länger

**Typische Anwendungen:** Stanzen von Blechen, Lochen, Ausschneiden, einfaches Prägen, Massenteile in der Serienfertigung

**Typische Hersteller:** Schuler, Bruderer, Aida, Minster, Erfurt, Mefisto

## Das Funktionsprinzip der Hydraulikpresse

Die Hydraulikpresse überträgt Kraft hydraulisch über Drucköl und Hydraulikzylinder auf den Stößel. Die Kraft ist über den gesamten Hubweg konstant – unabhängig davon, wo sich der Stößel gerade befindet.

### Stärken der Hydraulikpresse

- **Konstante Kraft über gesamten Hub:** Der Stößel drückt mit voller Kraft, egal wo im Hub
- **Frei programmierbarer Hubweg:** Position, Geschwindigkeit und Kraft sind stufenlos einstellbar
- **Hohes Kraft-Volumen-Verhältnis:** Für kleine Baugrößen sehr hohe Kräfte erreichbar
- **Sanfter Antritt:** Keine Schlagartige Belastung – schonend für Werkzeuge und Werkstücke
- **Überdrucksicherung integriert:** Automatischer Druckabfall bei Überlast

### Grenzen der Hydraulikpresse

- **Geringere Hubfrequenz:** 2–30 Hübe pro Minute – langsamer als die Exzenterpresse
- **Komplexere Wartung:** Hydrauliköl, Dichtungen, Ventile müssen gewartet werden
- **Höhere Betriebskosten:** Öl- und Filterwechsel, Wärmemanagement
- **Längere Taktzeiten:** Für Massenproduktion oft nicht geeignet

**Typische Anwendungen:** Tiefziehen, Prägen, Kalibrieren, Bördeln, Zusammenfügen von Bauteilen, Pressen von Verbundmaterialien, Gummiformen

**Typische Hersteller:** Schuler, Dieffenbacher, Müller Weingarten, Beckwood, Greenerd, Hare

## Direkter Vergleich: Welche Presse für welche Aufgabe?

| Eigenschaft | Exzenterpresse | Hydraulikpresse |
|---|---|---|
| Hubfrequenz | Hoch (40–300 Hub/min) | Niedrig (2–30 Hub/min) |
| Kraft über Hub | Nur am Totpunkt max. | Konstant über gesamten Hub |
| Hubweg anpassbar | Begrenzt | Vollständig frei |
| Flexibilität | Gering (festes Programm) | Hoch (frei programmierbar) |
| Stanzen | Ideal | Bedingt geeignet |
| Tiefziehen | Bedingt geeignet | Ideal |
| Betriebskosten | Niedrig | Mittel |
| Wartungsaufwand | Gering | Mittel bis hoch |

## Sicherheitsaspekte – bei beiden Pressentypen entscheidend

Pressen sind Maschinen mit erheblichem Verletzungsrisiko. Folgende Sicherheitseinrichtungen sind Pflicht:

- **Zweihandbedienung** oder lichtvorhang-gesicherter Bereich
- **Not-Aus-Funktion** mit Kategorie 0 oder 1 gemäß EN ISO 13849
- **Stößelsicherung** gegen unerwartetes Absinken (hydraulisch oder mechanisch)
- Regelmäßige **Prüfung durch Befähigte Person** gemäß BetrSichV

## Gebrauchte Pressen kaufen – was ist zu beachten?

Pressen sind solide gebaut und halten bei korrekter Wartung Jahrzehnte. Beim Gebrauchtkauf:

1. **Sicherheitstechnik vollständig?** CE-Kennzeichnung, Schaltpläne, Sicherheitsrelais
2. **Bei Hydraulikpressen:** Öl auf Farbe und Zustand prüfen, alle Schläuche auf Risse, Druck testen
3. **Bei Exzenterpressen:** Hauptlager, Kurbelwelle auf Spiel prüfen, Bremse und Kupplung testen
4. **Werkzeugaufnahme:** Passt Ihre vorhandene Werkzeugausrüstung?
5. **Tischmaß und Hubhöhe:** Entspricht das Ihren Werkzeuggrößen?

---

Wir haben regelmäßig Exzenterpressen und Hydraulikpressen unterschiedlicher Tonnagenklassen im Lager. Fragen Sie uns nach aktuellem Bestand und lassen Sie sich unverbindlich beraten.
  $md$,
  'https://images.unsplash.com/photo-1676646693434-8ee684e8ba49?w=1200&auto=format&fit=crop&q=80',
  'Technik',
  'Hydraulikpresse vs. Exzenterpresse – Welche Presse ist die richtige? | Firmenberatung Kassel',
  'Exzenterpresse oder Hydraulikpresse? Wir vergleichen Funktionsprinzip, Anwendungsgebiete, Kosten und Wartungsaufwand beider Pressentypen – mit Kauftipps für gebrauchte Maschinen.',
  true
);

-- Artikel 13 (letzter der 9 neuen): Maschinenpark planen
INSERT INTO blog_posts (slug, titel, teaser, inhalt, bild_url, kategorie, seo_title, seo_description, veroeffentlicht) VALUES (
  'maschinenpark-planen-aufbauen-tipps',
  'Maschinenpark aufbauen – wie Sie Ihren Betrieb mit der richtigen Strategie ausstatten',
  'Den Maschinenpark eines Betriebs aufzubauen oder zu erweitern, ist eine der wichtigsten unternehmerischen Entscheidungen. Wir zeigen, worauf es bei der Planung ankommt.',
  $md$
# Maschinenpark aufbauen – wie Sie Ihren Betrieb mit der richtigen Strategie ausstatten

Der Aufbau oder die Erweiterung eines Maschinenparks ist eine der bedeutendsten Investitionsentscheidungen, die ein metallverarbeitender Betrieb treffen kann. Falsch geplant, werden Maschinen gekauft, die nicht zur Auftragssituation passen. Richtig geplant, entsteht eine Produktionsbasis, die über Jahrzehnte trägt.

## Schritt 1: Anforderungsanalyse – Was soll gefertigt werden?

Bevor Sie auch nur einen Maschinentyp in Betracht ziehen, sollten Sie Ihre Anforderungen klar definieren:

**Werkstoffe:** Stahl, Aluminium, Edelstahl, Guss, Kunststoff? Jedes Material stellt andere Anforderungen an Maschine, Werkzeug und Kühlung.

**Teilegeometrien:** Rotationsteile (Drehen), prismatische Teile (Fräsen), Blechteile (Biegen, Stanzen)?

**Stückzahlen:** Einzelteile und Prototypen erfordern andere Maschinen als Serienfertigung. Ein Einzelteilfertiger braucht flexible Universalmaschinen; ein Serienfertiger braucht durchsatzoptimierte Spezialmaschinen.

**Toleranzen und Oberflächenqualität:** Allgemeintoleranz IT10 oder Präzision IT5? Das bestimmt, ob eine konventionelle Maschine ausreicht oder ob CNC und Schleifen notwendig sind.

## Schritt 2: Kapazitätsplanung – Wie viel brauchen Sie wirklich?

Ein häufiger Fehler: zu groß und zu teuer kaufen, "um gewappnet zu sein". Eine Maschine, die zu 20 % ausgelastet ist, bindet Kapital ohne Ertrag.

Berechnen Sie den realen Bedarf:
- Wie viele Maschinenstunden pro Monat benötige ich für aktuelle Aufträge?
- Wie viel Wachstum plane ich in 3–5 Jahren realistisch ein?
- Welche Bearbeitungsoperationen sind Engpässe, welche laufen problemlos?

**Empfehlung:** Planen Sie für eine Auslastung von 70–80 %. Darunter ist die Investition kaum wirtschaftlich, darüber droht Kapazitätsmangel.

## Schritt 3: Neu oder gebraucht – die ehrliche Abwägung

### Neumaschinen

- **Vorteil:** Aktuelle Technologie, Herstellergarantie, Service-Vertrag möglich
- **Nachteil:** Deutlich höherer Preis, oft 6–12 Monate Lieferzeit
- **Empfehlung:** Sinnvoll bei spezifischen Anforderungen, langen Amortisationszeiträumen oder wenn Förderprogramme genutzt werden können

### Gebrauchtmaschinen

- **Vorteil:** 30–70 % günstiger als Neu, sofort verfügbar, Zustand bekannt und prüfbar
- **Nachteil:** Höheres Wartungsrisiko, ältere Steuerungstechnologie, kein Herstellerservice
- **Empfehlung:** Ideal für den Aufbau, für Ergänzungen und für den Einstieg in neue Fertigungsverfahren

**Praxistipp:** Viele erfolgreiche Betriebe bauen ihren Kernmaschinenpark schrittweise auf – zunächst mit gut erhaltenen Gebrauchtmaschinen, bis die Auslastung den Neukauf rechtfertigt.

## Schritt 4: Layoutplanung – Maschinen im Raum denken

Eine Maschine ist nicht allein. Sie braucht:

- **Stellfläche:** Mindestens Maschinenfußabdruck plus 1,5–2 m Wartungs- und Bedienzugang an allen Seiten
- **Kranversorgung:** Schwere Werkstücke brauchen Kran oder Hebezeug – ist die Decke tragfähig genug?
- **Druckluftversorgung:** Spannmittel, Blas- und Kühlluft
- **Elektroversorgung:** Drehstrom, Absicherung, Anschlussleistung
- **Kühlmittelentsorgung:** Sammelwanne, Entsorgungskonzept
- **Späneentsorgung:** Zentral oder dezentral?

Planen Sie das Layout auf Papier oder mit einfacher Software, bevor die Maschinen angeliefert werden.

## Schritt 5: Langfristig denken – Wartung, Ersatzteile, Schulung

Der Kaufpreis einer Maschine ist nicht der einzige Kostenblock. Über die Lebensdauer fallen an:

- **Wartungskosten:** Öl, Filter, Verschleißteile (ca. 1–3 % des Kaufpreises pro Jahr)
- **Werkzeuge:** Fräser, Drehmeißel, Schleifscheiben (stark anwendungsabhängig)
- **Schulung:** Besonders bei CNC-Maschinen – ohne geschulte Bediener kein wirtschaftlicher Betrieb
- **Halleninfrastruktur:** Kran, Lüftung, Absaugung, Kühlmittelaufbereitung

## Typische Maschinenpark-Strategien nach Betriebsgröße

### Kleine Werkstatt / Einmann-Betrieb (bis 5 Mitarbeiter)

Fokus auf Flexibilität: Eine gute konventionelle Drehmaschine, eine Konsolenfräse und eine Metallbandsäge decken das Gros der Aufgaben ab. CNC erst bei gesicherter Auslastung.

### Mittelständischer Lohnfertiger (5–30 Mitarbeiter)

CNC-Drehzentrum + CNC-Fräs-BAZ als Kern. Ergänzt durch Flachschleifmaschine für Präzision und Blechbearbeitungsmaschinen bei Bedarf. Fokus auf Auslastung und Durchsatz.

### Spezialisierter Produktionsbetrieb

Hier dominieren spezifische Maschinentypen: z. B. ausschließlich Blechbearbeitungsmaschinen bei einem Blechspezialisten, oder ausschließlich Schleifmaschinen bei einem Feinmechanikbetrieb.

---

Sie planen einen Neueinstieg oder die Erweiterung Ihres Maschinenparks? Wir beraten Sie gerne persönlich und zeigen Ihnen, welche Maschinen aus unserem Bestand zu Ihren Anforderungen passen. Vereinbaren Sie einen kostenlosen Beratungstermin.
  $md$,
  'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?w=1200&auto=format&fit=crop&q=80',
  'Ratgeber',
  'Maschinenpark aufbauen und planen – Tipps für Industrie und Handwerk | Firmenberatung Kassel',
  'Wie baue ich einen Maschinenpark strategisch auf? Wir erklären Anforderungsanalyse, Kapazitätsplanung, Neu vs. gebraucht und die typischen Ausstattungsstrategien für Betriebe aller Größen.',
  true
);
