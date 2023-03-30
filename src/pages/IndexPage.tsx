import React from 'react'
import indeximg1 from "../assets/indeximg1.jpeg"
import indeximg2 from "../assets/indeximg2.jpeg"
import indeximg3 from "../assets/indeximg3.jpeg"

const IndexPage = () => {
  return (
    <div className="flex flex-col items-center w-[100%] h-[100%] gap-[100px] ">
      <div className="bg-slate-200 flex flex-col space-y-5 p-5 h-fit w-[75%] shadow-xl rounded-2xl">
        <h2 className="text-2xl text-center">Tervetuloa Kokkinurkan pariin!</h2>
        <p>Kokkinurkan avulla pystyt lukemaan toisten käyttäjien palveluun lisäämiä reseptejä sekä lisäämään niitä itse. Sivusto hyödyntää MongoDB-tietokantaa reseptien
          tallentamista varten.
          Tämä suhteellisen yksinkertainen React-pohjainen webbisovellus ei ole tarkoitettu kaupallista käyttöä varten.</p>
        <h3 className="text-xl text-center">Sovelluksen käyttö</h3>
        <p>Kirjautumaton käyttäjä pystyy selaamaan sivulle lisättyjä reseptejä ja niihin lisättyjä kommentteja, mutta reseptin lisäämistä, niiden suosikiksi lisäämistä
          sekä kommentointia varten tulee palveluun rekisteröityä sekä kirjautua. Se käy helposti navigoinnin Rekisteröidy- sekä Kirjaudu-painikkeen kautta.
        </p>
      </div>
      <div className="flex justify-center h-[150px] space-x-5 pb-5 md:h-[250px] lg:h-[350px]">
        <img src={indeximg1} className="max-w-[30%] object-cover rounded-3xl shadow-xl" alt="" />
        <img src={indeximg2} className="max-w-[30%] object-cover rounded-3xl shadow-xl" alt="" />
        <img src={indeximg3} className="max-w-[30%] object-cover rounded-3xl shadow-xl" alt="" />
      </div>
    </div>
  )
}

export default IndexPage