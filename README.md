![image](https://github.com/khalidbelhadj/htbx/assets/38633386/1283f4a0-20dc-4a0b-bde9-7f63ab06a5f8)


## Inspiration

As students, we've come to notice a common practice of **relying on consensus** when it comes to learning. When we make our notes, **we consult various sources**—lecture slides, textbooks, past student notes, and even materials from other universities - to strengthen our understanding and ensure comprehensive coverage.

However, a frequent challenge arises: **cognitive overload**. The sheer volume of resources, often in the form of hundreds of low-quality PDFs, becomes overwhelming. Sorting through these materials to find specific information can be a daunting task. **The more data there is, the harder it gets to interpret.**

That's where we come in! 

NoteVec **empowers all students to share their notes with their classmates**. These notes are quickly searchable and allow for communication between users. With NoteVec, **the more data your class submits, the easier it gets to interpret**. 

## What it does

**Share**: Simplify note-sharing with an easy drag-and-drop experience to share notes and access notes with other classmates. 

**Search**: Use our lightning-fast, vectorized search feature to quickly locate the precise note you need within the database.

**Visualise**: Gain a comprehensive understanding by visually exploring the entire knowledge base with our graph visualisation.

**Collaborate**: Enhance your learning by providing feedback and engaging in discussions through comments on your classmates' notes.

Even the most non-technical people will be able to share their notes online and benefit from other student's resources

## How we built it

Our main goal was to build an amazing UI to ease user experience and ensure scalability from the get-go.

- Our front-end is built with modern technologies of NextJS combined with TailwindCSS, Shadcn and D3js. 
- To ensure our scalability we opted for a serverless approach, MongoDB for main document metadata storing, AWS S3 for pdf blob storing and serverless function for thumbnail generation.

## Challenges we ran into

- Storing and retrieving pdfs is surprisingly difficult due to encoding formats that different browsers use. For example, Chromium supports different formats than other browser engines causing for unexpected downloads of pdfs. Really hard solve!
- Our topic graph is built using different technologies than the rest of the site (D3js with physics vs React) causing for difficult compatibility between functions and types. To remedy for this, we ensured that the data being fed to the graph would never change shape. 
- ....and one of our teammates got food poisoning from dinner!

## What's next for NoteVec

- Add embedding by paragraph to allow for more precise search!
- User accounts and classes
