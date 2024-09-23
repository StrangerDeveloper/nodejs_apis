const express = require("express");
const worker = require("./../models/worker");

const router = express.Router();

router.post("/postWorker", async (req, res)=>{
    try {
            ///check if user exist
        const data = await worker.findOne({ phone: req.body.phone });
        if (data) {
            res.status(409).json({sucess: true, message: "Worker already exist", data: {} })
        } else {
            //res.status(400).json({ sucess: false, message: "User not exists", data: {} })
            const workerModel = worker({
                name: req.body.name,
                type: req.body.type,
                address: req.body.address,
                dailyWages: req.body.dailyWages,
                phone: req.body.phone,
                createdDate: req.body.createdDate ?? Date.now(),
                userID: req.body.userID
            });
            const dataToSave = workerModel.save();
            res.status(201).json({ sucess: true, message: "Worker added", data: dataToSave });

        }
    }
    catch (error) {
        res.status(500).json({ sucess: false, message: error.message, data:{} })
    }
});

///get worker by userId

router.get("/getWorkerByUserId", async (req, res)=>{
    try {
        const data = await worker.findById(req.body.userID);
        if(!data){
            return res.status(404).json({success: false, message: "not Found", data:{}})
        }

        res.status(200).json({sucess:true, message: "Successful",data:data})
    }
    catch (error) {
        res.status(500).json({ sucess:false, message: error.message, data:{} })
    }
});

router.get("/getWorkerByContractId", async (req, res)=>{
    try{

        const data =  worker.findById(req.body.contractId);
        if(!data){
            return res.status(404).json({success: false, message: "not Found", data:{}})
        }

        res.status(200).json({success:false, message: "Success", data, data});

    }catch(error){
        res.status(500).json({sucess:false, message: error.message, data:{}});
    }
});



router.get("/getFreeWorker", async (req, res)=>{
    try{
        const freeWorker = worker.findOne({isFree: req.body.isFree ?? true});
        
        if(!freeWorker){
            return res.status(404).json({success: false, message: "not Found", data:{}})
        }

        res.status(200).json({success: true, message: "Free Worker Found", data:freeWorker})

    }catch(error){
        res.status(500).json({sucess:false, message: error.message, data:{}});
    }
});



module.exports = router;

