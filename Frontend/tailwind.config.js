/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1440px'
      },
      spacing: {
        '2': '0.5rem',
      '4': '1rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '18': '4.5rem',
      '20': '5rem',
      '22': '5.5rem',
      '24': '6rem',
      '26': '6.5rem',
      '28': '7rem',
      '30': '7.5rem',
      '32': '8rem',
      '34': '8.5rem',
      '36': '9rem',
      '38': '9.5rem',
      '40': '10rem',
      '42': '10.5rem',
      '44': '11rem',
      '46': '11.5rem',
      '48': '12rem',
      '50': '12.5rem',
      '52': '13rem',
      '54': '13.5rem',
      '56': '14rem',
      '58': '14.5rem',
      '60': '15rem',
      '62': '15.5rem',
      '64': '16rem',
      '66': '16.5rem',
      '68': '17rem',
      '70': '17.5rem',
      '72': '18rem',
      '74': '18.5rem',
      '76': '19rem',
      '78': '19.5rem',
      '80': '20rem',
      '82': '20.5rem',
      '84': '21rem',
      '86': '21.5rem',
      '88': '22rem',
      '90': '22.5rem',
      '92': '23rem',
      '94': '23.5rem',
      '96': '24rem',
      '98': '24.5rem',
      '100': '25rem',
      '102': '25.5rem',
      '104': '26rem',
      '106': '26.5rem',
      '108': '27rem',
      '110': '27.5rem',
      '112': '28rem',
      '114': '28.5rem',
      '116': '29rem',
      '118': '29.5rem',
      '120': '30rem',
      '122': '30.5rem',
      '124': '31rem',
      '126': '31.5rem',
      '128': '32rem',
      '130': '32.5rem',
      '132': '33rem',
      '134': '33.5rem',
      '136': '34rem',
      '138': '34.5rem',
      '140': '35rem',
      '142': '35.5rem',
      '144': '36rem',
      '146': '36.5rem',
      '148': '37rem',
      '150': '37.5rem',
      '152': '38rem',
      '154': '38.5rem',
      '156': '39rem',
      '158': '39.5rem',
      '160': '40rem',
      }
    },
    
  },
  plugins: [require("daisyui")],
}