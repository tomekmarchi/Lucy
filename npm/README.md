What is Lucy?
=======
Lucy is a stripped down version of Acid used as a utility library for outside the browser. It's geared towards Node, WebWorkers, & ServiceWorkers.

What is Acid?
=======
Acidjs is a utility library for building CWAs (Conscious Web Apps). Conscious web apps are the next generation of single page web apps. CWA's have several advantages over modern SPAs, scalability for large apps, real-time, fine grained self-construction. Think of a bridge being formed in front of you while walking across but instead of the entire step being formed little bits of it come exactly when you need it. Acid embraces a highly modular philosophy that results in a complete separation of concerns.

What is the Acid Stack?
=======
Currently the following reactive libraries fit very will with Acid: Ractive, Polymer. Acid plays very well with Ractive as it embraces a clean API, separation of concerns & has dynamic components/partials. Ractive also has resets for Templates and partials allowing it to work very well with real-time HTML & CSS updates. A reactive library that allows HTML strings and even separation for CSS has massive advantages with the Acid methodology and codebase.

Default Stack - Node , RethinkDB, Lucy, Acid, Ractive, Menrvah (Coming soon CWA framework from)


Strings,Objects & Arrays
-----------------------
All methods for Strings, Objects, & Arrays are available from the root object typically $ and ACID as a fallback.

Model, Define & Module
-----------------------
In Acid everything is a model (Simple plain objects). Models can be "define" which are compiled models for immediately available objects. Models can also be "modules" which are asynchronously compiled models with built-in import capabilities. Modules can have various files,models and JS objects that are loaded on the fly and compiled into the final model.
