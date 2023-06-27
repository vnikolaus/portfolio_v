function verifyCPF(cpf: string | number): boolean {
    cpf = String(cpf).replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let check = true;
    [9, 10].forEach((pos: number) => {
      let sum = 0, res = 0;
      cpf = String(cpf);
      cpf.split(/(?=)/)
          .splice(0, pos)
            .forEach((el: string, i: number) => {
              sum += Number(el) * (pos + 2 - (i + 1));
            });
      res = sum % 11;
      res = res < 2 ? 0 : 11 - res;
      if (res != Number(cpf.substring(pos, pos + 1))) check = false;
    });
    return check;
  }