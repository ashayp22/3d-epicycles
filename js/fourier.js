//https://www.algorithm-archive.org/contents/cooley_tukey/cooley_tukey.html
//https://en.wikipedia.org/wiki/Discrete_Fourier_transform


//Discrete Fourier Transform (with summations)
function dft(x) {
    let X = [];
    const N = x.length;

    //finding X_n
    for (let k = 0; k < N; k++) {

        let re = 0; //real component
        let im = 0; //imaginary component

        //summation for X_n
        for (let n = 0; n < N; n ++) {

            let phi = (Math.PI*2 * k * n) / N;

            re += x[n] * Math.cos(phi);
            im -= x[n] * Math.sin(phi);
        }

        //averaging the contributions above
        re = re / N;
        im = im / N;

        //3 things need to create an epicycle
        let frequency = k; //given on wikipedia page
        let amplitude = Math.sqrt(re**2 + im**2);
        let phase = Math.atan2(im, re);

        X[k] = {re, im, frequency, amplitude, phase};

    }

    return X;
}
