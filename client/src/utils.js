const format = new Intl.NumberFormat('tr-TR', { maximumSignificantDigits: 3 }).format;

function getCandidateName(candidateName) {
    switch (candidateName) {
        case 'mi': return 'Muharrem Ince';
        case 'ma': return 'Meral Aksener';
        case 'tk': return 'Temel Karamollaoglu';
        case 'rte': return 'Recep Tayyip Erdogan';
        case 'dp': return 'Dogu Perincek';
        case 'sd': return 'Selahattin Demirtas';
    }
}

export {
    format,
    getCandidateName
};