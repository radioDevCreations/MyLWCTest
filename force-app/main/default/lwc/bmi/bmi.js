const getBMI = (weightInKilograms, heightInMeters) => {
    try{
        return this.weightInKilograms/(this.heightInMeters*this.heightInMeters);
        } catch (error) {
            return undefined;
        }
}

export default getBMI;

