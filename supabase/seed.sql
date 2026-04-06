-- ============================================================
-- FBK Website – Seed-Daten
-- ============================================================

-- Kategorien
INSERT INTO kategorien (id, name, slug, beschreibung) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Drehmaschinen', 'drehmaschinen', 'Konventionelle und CNC-Drehmaschinen aller Baugrößen'),
  ('a1000000-0000-0000-0000-000000000002', 'Fräsmaschinen', 'fraesmaschinen', 'Universal-, Konsolen- und Bettfräsmaschinen'),
  ('a1000000-0000-0000-0000-000000000003', 'Bearbeitungszentren', 'bearbeitungszentren', 'CNC-Bearbeitungszentren, horizontal und vertikal'),
  ('a1000000-0000-0000-0000-000000000004', 'Flachschleifmaschinen', 'flachschleifmaschinen', 'Flach- und Profilschleifmaschinen'),
  ('a1000000-0000-0000-0000-000000000005', 'Bandsägeautomaten', 'bandsaegautomaten', 'Metallbandsägen, manuell und automatisch'),
  ('a1000000-0000-0000-0000-000000000006', 'Blechbearbeitung', 'blechbearbeitung', 'Abkantpressen, Scheren, Walzen für Blech'),
  ('a1000000-0000-0000-0000-000000000007', 'Pressen', 'pressen', 'Exzenter-, Hydraulik- und Kniehebelpres­sen'),
  ('a1000000-0000-0000-0000-000000000008', 'Sonstiges', 'sonstiges', 'Weitere Werkzeugmaschinen und Industrieequipment');

-- Blog-Artikel 1
INSERT INTO blog_posts (slug, titel, teaser, inhalt, kategorie, seo_title, seo_description, veroeffentlicht) VALUES
(
  'gebrauchte-werkzeugmaschinen-kaufen-tipps',
  'Gebrauchte Werkzeugmaschinen kaufen – 7 Tipps, die Sie vor dem Kauf kennen sollten',
  'Wer eine gebrauchte Werkzeugmaschine kauft, kann viel Geld sparen – wenn er weiß, worauf es ankommt. Wir zeigen Ihnen die 7 wichtigsten Punkte.',
  E'# Gebrauchte Werkzeugmaschinen kaufen – 7 Tipps, die Sie vor dem Kauf kennen sollten\n\nDer Kauf einer gebrauchten Werkzeugmaschine kann eine hervorragende Möglichkeit sein, Ihr Unternehmen mit leistungsstarker Technik auszustatten – zu einem Bruchteil des Neupreises. Doch wer unvorbereitet kauft, riskiert böse Überraschungen. Mit diesen 7 Tipps sind Sie auf der sicheren Seite.\n\n## 1. Den genauen Bedarf klären\n\nBevor Sie sich auf die Suche machen, sollten Sie genau wissen, wofür Sie die Maschine benötigen. Welche Werkstoffe bearbeiten Sie? Welche Toleranzen sind notwendig? Welche Stückzahlen planen Sie? Je klarer Ihre Anforderungen, desto gezielter können Sie suchen – und desto weniger Geld geben Sie für Leistung aus, die Sie nicht brauchen.\n\n## 2. Das Baujahr richtig einordnen\n\nDas Baujahr einer Maschine allein sagt noch wenig über ihren Zustand aus. Eine gut gepflegte Maschine aus dem Jahr 2000 kann besser sein als eine vernachlässigte aus dem Jahr 2015. Wichtiger als das Baujahr ist die tatsächliche Laufleistung und die Art der bisherigen Nutzung.\n\n## 3. Auf Verschleißteile achten\n\nFührungen, Spindellager, Hydraulikdichtungen und Steuerungen sind die teuersten Verschleißteile einer Werkzeugmaschine. Fragen Sie gezielt nach dem Zustand dieser Bauteile und lassen Sie sich möglichst Wartungsprotokolle zeigen. Ein Prüfbericht eines Fachbetriebs gibt Ihnen zusätzliche Sicherheit.\n\n## 4. Die Steuerung nicht vergessen\n\nBei CNC-Maschinen ist die Steuerung oft das teuerste Bauteil. Ältere Steuerungen von Siemens Sinumerik, Fanuc oder Heidenhain können schwer zu warten sein, wenn Ersatzteile nicht mehr verfügbar sind. Prüfen Sie, ob die Steuerung noch aktuell und ersatzteilfähig ist.\n\n## 5. Probelauf und Testschnitt verlangen\n\nKaufen Sie keine Maschine, ohne sie vorher in Betrieb zu sehen. Ein Probelauf zeigt sofort, ob ungewöhnliche Geräusche, Vibrationen oder Schwingungen vorhanden sind. Wenn möglich, verlangen Sie einen Testschnitt in Ihrer typischen Anwendung.\n\n## 6. Transport und Aufstellung einkalkulieren\n\nWerkzeugmaschinen sind schwer und sperrig. Transportkosten, Kranleistungen und ein fachgerechter Anschluss (Strom, Druckluft, Kühlmittel) können schnell mehrere tausend Euro kosten. Kalkulieren Sie diese Posten von Anfang an in Ihr Budget ein.\n\n## 7. Auf einen seriösen Händler setzen\n\nDer Kauf über einen Fachhändler bietet klare Vorteile: Maschinen werden geprüft und aufbereitet, Unterlagen sind vorhanden, und Sie haben einen Ansprechpartner, wenn nach dem Kauf Fragen auftauchen. Bei Privatkäufen fehlt diese Sicherheit häufig.\n\n---\n\nHaben Sie Fragen zu einer bestimmten Maschine? Wir beraten Sie gerne persönlich – kostenlos und unverbindlich. Rufen Sie uns an oder schreiben Sie uns eine Nachricht.',
  'Ratgeber',
  'Gebrauchte Werkzeugmaschinen kaufen – 7 Tipps vor dem Kauf | Firmenberatung Kassel',
  'Worauf müssen Sie beim Kauf einer gebrauchten Werkzeugmaschine achten? Die 7 wichtigsten Tipps vom erfahrenen Händler aus Kassel.',
  true
);

-- Blog-Artikel 2
INSERT INTO blog_posts (slug, titel, teaser, inhalt, kategorie, seo_title, seo_description, veroeffentlicht) VALUES
(
  'maschinenpark-aufloesung-was-tun',
  'Betriebsauflösung oder Maschinenpark verkleinern – Was tun mit alten Maschinen?',
  'Ob Insolvenz, Umstrukturierung oder Generationswechsel – wer Maschinen loswerden möchte, hat mehrere Optionen. Wir erklären, welche Wege sich lohnen.',
  E'# Betriebsauflösung oder Maschinenpark verkleinern – Was tun mit alten Maschinen?\n\nOb ein Betrieb aufgegeben wird, eine Umstrukturierung ansteht oder Kapazitäten reduziert werden sollen – immer wieder stehen Unternehmer vor der Frage: Was mache ich mit meinen alten Maschinen?\n\n## Option 1: Verkauf an einen Maschinenhändler\n\nDer schnellste und unkomplizierteste Weg ist der Direktverkauf an einen spezialisierten Händler. Sie erhalten eine schnelle Bewertung, müssen sich nicht um Vermarktung oder Besichtigungen kümmern, und der Händler übernimmt in der Regel auch den Abtransport. Der Erlös ist oft geringer als bei einem Direktverkauf an den Endkunden – dafür ist der Prozess schnell und sicher.\n\n## Option 2: Direktverkauf über Online-Plattformen\n\nPlattformen wie Maschinensucher, TradeMachines oder eBay Kleinanzeigen ermöglichen den direkten Verkauf an Endkunden. Die Erlöse können höher sein, doch der Aufwand ist erheblich: Fotos machen, Inserate schreiben, Anfragen beantworten, Besichtigungen organisieren, Verhandlungen führen, Transportlogistik klären. Für Unternehmen in der Auflösungsphase ist das oft zu zeitaufwendig.\n\n## Option 3: Auktion\n\nMaschinenversteigerungen – live oder online – bieten einen transparenten Prozess und können bei gefragten Maschinen gute Preise erzielen. Allerdings sind Auktionsergebnisse schwer vorherzusagen, und Auktionsgebühren reduzieren den Nettoerlös.\n\n## Option 4: Verschrottung\n\nMaschinen, die weder technisch noch wirtschaftlich sinnvoll nutzbar sind, können verschrottet werden. Je nach Materialgewicht und aktuellen Schrottpreisen lässt sich noch ein geringer Erlös erzielen. Diese Option sollte jedoch erst in Betracht gezogen werden, wenn alle anderen Möglichkeiten ausgeschöpft sind.\n\n## Unser Tipp: Frühzeitig handeln\n\nWer zu lange wartet, verliert Wert. Maschinen, die über Monate ungenutzt stehen, verlieren an Attraktivität und können Schäden durch Stillstand entwickeln. Handeln Sie frühzeitig und holen Sie sich unverbindliche Angebote ein – auch wenn Sie noch nicht sicher sind, ob und wann Sie verkaufen möchten.\n\n---\n\nWir kaufen gebrauchte Werkzeugmaschinen aller Art an – Einzelmaschinen, komplette Parks, auch bei Betriebsauflösungen. Sprechen Sie uns an.',
  'Ratgeber',
  'Betriebsauflösung – Was tun mit alten Maschinen? | Firmenberatung Kassel',
  'Maschinen verkaufen bei Betriebsauflösung: Händler, Auktion oder Plattform? Wir erklären die Optionen und helfen bei der Abwicklung.',
  true
);

-- Blog-Artikel 3
INSERT INTO blog_posts (slug, titel, teaser, inhalt, kategorie, seo_title, seo_description, veroeffentlicht) VALUES
(
  'drehmaschinen-cnc-vs-konventionell',
  'CNC-Drehmaschine oder konventionelle Drehmaschine – Was passt zu Ihrem Betrieb?',
  'CNC oder konventionell? Beide Varianten haben ihre Berechtigung. Wir erklären die Unterschiede und helfen Ihnen bei der Entscheidung.',
  E'# CNC-Drehmaschine oder konventionelle Drehmaschine – Was passt zu Ihrem Betrieb?\n\nDie Wahl zwischen einer CNC-gesteuerten und einer konventionellen Drehmaschine ist keine Frage von "besser oder schlechter" – sondern von Anwendung, Stückzahl und Betriebsstruktur.\n\n## Was ist eine konventionelle Drehmaschine?\n\nKonventionelle Leit- und Zugspindeldrehmaschinen werden manuell bedient. Der Dreher steuert Vorschub, Tiefenzustellung und Drehzahl per Hand. Diese Maschinen sind robust, wartungsarm und seit Jahrzehnten bewährt. Sie sind ideal für Einzelanfertigungen, Reparaturarbeiten und den handwerklichen Betrieb.\n\n**Vorteile:**\n- Geringere Anschaffungskosten\n- Einfache Bedienung – wenig Schulungsaufwand\n- Robust und langlebig\n- Geringer Wartungsaufwand\n\n**Nachteile:**\n- Langsamer bei Serienfertigung\n- Qualität abhängig vom Bediener\n- Keine Programmspeicherung möglich\n\n## Was ist eine CNC-Drehmaschine?\n\nCNC-Drehmaschinen werden über eine digitale Steuerung (z. B. Siemens Sinumerik, Fanuc) betrieben. Bearbeitungsprogramme werden einmal erstellt und können beliebig oft reproduziert werden. Sie sind die erste Wahl für Serienfertigung und präzise Wiederholarbeiten.\n\n**Vorteile:**\n- Hohe Präzision und Reproduzierbarkeit\n- Ideal für Serienfertigung\n- Schnellere Bearbeitung bei komplexen Konturen\n- Programme können gespeichert und wieder aufgerufen werden\n\n**Nachteile:**\n- Höhere Anschaffungskosten\n- Komplexere Wartung (Steuerung, Servoantriebe)\n- Schulungsbedarf für Bediener und Programmierer\n\n## Unsere Empfehlung\n\nFür Betriebe mit hauptsächlich Einzelteilen und Reparaturen: konventionell. Für Zulieferer, die Serien fertigen: CNC. Viele mittelständische Betriebe fahren gut mit einer Mischung aus beiden – eine konventionelle Maschine für die Werkstatt und eine CNC-Maschine für Serienarbeiten.\n\n---\n\nWir haben sowohl konventionelle als auch CNC-Drehmaschinen im Bestand. Schauen Sie sich unser aktuelles Angebot an oder rufen Sie uns an – wir beraten Sie gerne.',
  'Technik',
  'CNC vs. konventionelle Drehmaschine – Was ist besser? | Firmenberatung Kassel',
  'CNC oder konventionell? Wir erklären die Unterschiede zwischen CNC- und konventionellen Drehmaschinen und helfen bei der Wahl.',
  true
);

-- Beispiel-Bewertungen
INSERT INTO bewertungen (name, bewertung, text, freigegeben) VALUES
  ('Thomas K.', 5, 'Sehr kompetente Beratung und faire Preise. Habe eine gebrauchte Drehmaschine gekauft und bin sehr zufrieden. Der Transport wurde problemlos organisiert. Absolut empfehlenswert!', true),
  ('Markus W.', 5, 'Schnelle Abwicklung beim Verkauf meiner alten Fräsmaschine. Innerhalb von 2 Tagen war alles erledigt und das Geld auf dem Konto. Top Service!', true),
  ('Stefan H.', 5, 'Bereits zum dritten Mal hier gekauft. Immer gute Qualität, ehrliche Aussagen zum Zustand der Maschinen und faire Preise. So muss Maschinenhandel funktionieren.', true),
  ('Klaus B.', 4, 'Gute Auswahl, freundlicher Kontakt. Lieferzeit war etwas länger als erwartet, aber insgesamt sehr zufrieden mit dem Kauf.', true),
  ('Andreas M.', 5, 'Bei einer Betriebsauflösung hat Firmenberatung Kassel unseren kompletten Maschinenpark übernommen. Unkompliziert, schnell und zu einem fairen Preis. Vielen Dank!', true);
