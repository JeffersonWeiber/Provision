export const maskPhone = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
};

export const maskCPF = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskCNPJ = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskDate = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})\d+?$/, '$1');
};

export const maskCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const amount = (Number(numericValue) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return amount;
};

export const formatCourseDate = (dateValue: string | undefined | null) => {
    if (!dateValue) return 'A definir';

    const MONTHS_SHORT_PT = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const formatDateStr = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        if (!year || !month || !day) return dateStr;
        return `${parseInt(day)} de ${MONTHS_SHORT_PT[parseInt(month) - 1]} de ${year}`;
    };

    const parts = dateValue.split('/');
    if (parts.length === 2) {
        const start = parts[0];
        const end = parts[1];

        const [sYear, sMonth, sDay] = start.split('-');
        const [eYear, eMonth, eDay] = end.split('-');

        if (sMonth === eMonth && sYear === eYear) {
            return `${parseInt(sDay)} a ${parseInt(eDay)} de ${MONTHS_SHORT_PT[parseInt(sMonth) - 1]} de ${sYear}`;
        }

        return `${formatDateStr(start)} a ${formatDateStr(end)}`;
    }

    return formatDateStr(dateValue);
};
