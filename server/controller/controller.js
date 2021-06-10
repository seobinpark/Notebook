const Bookdb = require('../model/model');


exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "값이 비어 있음"});
        return;
    }

    const book = new Bookdb({
        name : req.body.name,
        description : req.body.description,
        date: req.body.date
    })

    book
        .save(book)
        .then(data => {
            res.redirect('/add-book');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "추가 오류"
            });
        });

}

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Bookdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "찾을 수 없음 "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "에러 발생 " + id})
            })

    }else{
        Bookdb.find()
            .then(book => {
                res.send(book)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "에러 발생" })
            })
    }

    
}

exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "값이 비어있음"})
    }

    const id = req.params.id;
    Bookdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : '아이디값을 찾을 수 없음'})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "에러 발생"})
        })
}


exports.delete = (req, res)=>{
    const id = req.params.id;

    Bookdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : '아이디값 찾을 수 없음'})
            }else{
                res.send({
                    message : "삭제 완료"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "아이디값 찾을 수 없음"
            });
        });
}